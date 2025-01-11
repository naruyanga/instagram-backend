const Router = require("express");
const userRouter = Router();

const signup = require("../controllers/signup");
const follow = require("../controllers/follow");
const unfollow = require("../controllers/unfollow");
const authMiddleWare = require("../controllers/auth-middleware");
const login = require("../controllers/login");

const { userModel } = require("../models/userSchema");

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/follow", follow);
userRouter.post("/unfollow", unfollow);

userRouter.get("/userWithPost/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await userModel
      .findById(userId)
      .populate("posts", "postImage caption userId");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.get("/getFollowingUsers/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const users = await userModel.findById(userId).populate({
      path: "following",
      select: "username email profileImage",
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});
userRouter.get("/getFollowedUsers/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const users = await userModel.findById(userId).populate({
      path: "followers",
      select: "username email profileImage",
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = userRouter;
