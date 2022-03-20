import fs from "fs";
import path from "path";
import mongoose, { ConnectOptions } from "mongoose";
import { Card } from "./models/Card";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, ".env") });

const MONGODB_URI: string = process.env["MONGODB_URI"] || "";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log(`Connected to MongoDB connection successfully.`);
  })
  .catch((err) => {
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    // process.exit();
  });

// Parse data
const data = JSON.parse(fs.readFileSync(`${__dirname}/db/data.json`, "utf-8"));

// Import into DB
const importData = async () => {
  try {
    await Card.create(data);
    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Card.deleteMany();
    console.log("Data Destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  console.log(MONGODB_URI);
  deleteData();
}
