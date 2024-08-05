import app from "./src/app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  try {
    if (!process.env.DB) {
      throw new Error("env invalid");
    }

    await mongoose.connect(process.env.DB);

    app.listen(3000, function () {
      console.log("Server is running");
    });
  } catch (error) {
    console.log(error);
  }
}

main();
