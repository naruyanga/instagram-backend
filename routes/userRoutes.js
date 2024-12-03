const Router = require("express");
const userRouter = Router();

const signup = require("../controllers/signup");
const follow = require("../controllers/follow");
const unfollow = require("../controllers/unfollow");

const { userModel } = require("../models/userSchema");

userRouter.post("/signup", signup);
userRouter.post("/follow", follow);
userRouter.post("/unfollow", unfollow);

userRouter.get("/userWithPost", async (req, res) => {
  try {
    const posts = await userModel
      .find()
      .populate("posts", "postImage caption userId");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = userRouter;
