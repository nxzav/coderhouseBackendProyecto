import { CartService, UserService } from '../repositories/index.js';
import { createHash, generateToken, isValidPassword } from '../utils.js';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.getUserByEmail(email);

    if (!user) return res.status(400).json({ msg: 'Datos incorrectos' });
    const passwordIsValid = isValidPassword(password, user.password);
    if (!passwordIsValid)
      return res.status(400).json({ msg: 'Datos incorrectos' });

    const { _id, first_name, last_name, role } = user;
    const token = generateToken({ _id, first_name, last_name, role });

    return res.json({ status: 'success', user, token });
  } catch (error) {
    console.log('Log in error :', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const registerUser = async (req, res) => {
  try {
    req.body.password = createHash(req.body.password);
    console.log(req.body.password);
    const newCart = await CartService.createCart();
    console.log(newCart);
    req.body.cart = newCart._id;
    console.log(req.body.cart);
    const user = await UserService.registerUser(req.body);
    const { _id, first_name, last_name, email, role } = user;
    const token = generateToken({ _id, first_name, last_name, email, role });
    console.log({token});

    return res.json({ status: 'success', user, token });
  } catch (error) {
    console.log('Register user error :', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};
