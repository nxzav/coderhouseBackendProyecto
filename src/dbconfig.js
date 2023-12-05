import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nxzdev:zGH3Z6HsGSvpphJL@cluster0.8j0u18n.mongodb.net/?retryWrites=true&w=majority",
      { dbName: "ecommerce" }
    );
    console.log("DB connected");
  } catch (error) {
    console.log(`Connection to DB failed ${error}`);
  }
};