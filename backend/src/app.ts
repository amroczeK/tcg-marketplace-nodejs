import express from "express";
import session from "express-session";
import compression from "compression";
import MongoStore from "connect-mongo";
import mongoose, { ConnectOptions } from "mongoose";
import { SESSION_SECRET, MONGODB_URI } from "./util/secrets";

// Create Express server
const app = express();

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
