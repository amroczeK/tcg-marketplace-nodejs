import express from "express";
import session from "express-session";
import compression from "compression";
import MongoStore from "connect-mongo";
import mongoose, { ConnectOptions } from "mongoose";
import path from "path";
import dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, ".env") });

// Create Express server
const app = express();

const SESSION_SECRET: string = process.env.SESSION_SECRET || "";

// Connect to MongoDB
const MONGODB_URI: string = process.env.MONGODB_URI || "";

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

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
    }),
  })
);

export default app;
