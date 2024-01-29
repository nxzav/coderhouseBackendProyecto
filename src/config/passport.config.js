import passport from "passport";
import UserModel from "../models/user.model.OLD.js";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import passportJWT from 'passport-jwt';
import { createHash, isValidPassword } from "../utils.js";
import config from "./config.js";

const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = local.Strategy;

const cookieExtractor = (req) => {
  const token = (req?.cookies) ? req.cookies['coderCookie'] : null;

  console.log({cookies: req.cookies});
  console.log('COOKIE EXTRACTOR: ', token);
  return token;
}

const initializePassport = () => {

  // JsonWebToken
  passport.use('jwt', new JWTStrategy({
    secretOrKey: config.JWTKey,
    jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cookieExtractor]),
  }, (jwt_payload, done) => {
    console.log(jwt_payload);
    return done(null, jwt_payload);
  }));

  // Local
  passport.use("register", new LocalStrategy({
    passReqToCallback: true,
    usernameField: "email",
  }, async (req, username, password, done) => {
      const {first_name, last_name, email } = req.body;
      try {
        const user = await UserModel.findOne({ email: username });
        if (user) {
          console.log("User already exists");
          return done(null, false);
        }

        const newUser = {
          first_name,
          last_name,
          email,
          password: createHash(password),
        };

        const result = await UserModel.create(newUser);
        return done(null, result);
        
      } catch (error) {
        done("Register error " + error);
      }
    }
  )
);

passport.use("login", new LocalStrategy({
      usernameField: "email",
    }, async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ email: username }).lean().exec();

        if (!user) {
          console.log("User doesn't exist");
          return done(null, false);
        }

        if (!isValidPassword(user, password)) {
          console.error('Password not valid');
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done('Log in error ' + error);
      }
    }
  ));

  // GitHub
  passport.use("github", new GitHubStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);

    try {
      const user = await UserModel.findOne({email: profile._json.email});
      if (user) {
        console.log("Already registered", user);
        return done(null, user);
      }

      const newUser = await UserModel.create({
        first_name: profile._json.name,
        last_name: "",
        email: profile._json.email,
        password: "",
      })

      return done(null, newUser);

    } catch (error) {
      return done("GitHub login error " + error);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
