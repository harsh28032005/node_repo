import express from "express";
import mongoose from "mongoose";
import router from "./routes/employeeRoute.js";
import "dotenv/config";
const app = express();
app.use(express.json());

const url = process.env.mongoUrl;
mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDb Database is connected successfully...");
  })
  .catch((err) => {
    console.log("MongoDb Database is not connected...", err);
  });

app.use("", router);
app.listen(process.env.PORT, () =>
  console.log("Server is running on port 3000.")
);
