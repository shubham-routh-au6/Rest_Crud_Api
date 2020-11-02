import express from "express";
import mongoose from "mongoose";
import userRoute from "./route/userRoute.mjs";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("useCreateIndex", true);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(function () {
    console.log("Database connected successfully");
  })
  .catch(function (err) {
    console.log(err.message);
  });

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(userRoute);

app.listen(PORT, () => {
  console.log(`Server is up at ${PORT}`);
});
