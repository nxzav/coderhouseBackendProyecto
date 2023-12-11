import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { dbName: process.env.DB_NAME });
    console.log("DB connected");
  } catch (error) {
    console.log(`Connection to DB failed ${error}`);
  }
};