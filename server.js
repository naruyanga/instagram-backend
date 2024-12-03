const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const likeRouter = require("./routes/likeRoutes");
dotenv.config();
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

const connectDB = async () => {
  const res = await mongoose.connect(process.env.MONGODB_URI);
  if (res) console.log("db connected");
};
connectDB();

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use(likeRouter);

app.listen(8080, console.log("running"));
