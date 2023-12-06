import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { dbName: "ecommerce" });
    console.log("DB connected");
  } catch (error) {
    console.log(`Connection to DB failed ${error}`);
  }
};