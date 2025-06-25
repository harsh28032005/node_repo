import express from "express";
import mongoose from "mongoose";
import studentRoute from "./routes/studentRoute.js";
const app = express();
app.use(express.json());
const url =
  "mongodb+srv://NishantGautam:nick-1999@cluster0.45vj3.mongodb.net/my_Db";
mongoose
  .connect(url)
  .then(() => console.log("MongoDb Database is connected successfully..."))
  .catch((err) => console.log("MongoDb Database is not connected...",err)),
  app.use("", studentRoute);

app.listen(3000, () => console.log("Server is running on the port 3000..."));
