import express from "express";
import mongoose from "mongoose";
import studentRoute from "./routes/studentRoute.js";
import "dotenv/config";
const app = express();
app.use(express.json());

const url = process.env.MONGO_URL;

mongoose
  .connect(url)
  .then(() => console.log("MongoDb Database is connected successfully..."))
  .catch((err) => console.log("MongoDb Database is not connected...", err)),

app.use("", studentRoute);

app.listen(process.env.PORT, () =>
  console.log("Server is running on the port 3000...")
);
