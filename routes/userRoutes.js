const Router = require("express");
const userRouter = Router();

const signup = require("../controllers/signup");
const follow = require("../controllers/follow");
const unfollow = require("../controllers/unfollow");
const authMiddleWare = require("../controllers/auth-middleware");

const { userModel } = require("../models/userSchema");

userRouter.post("/signup", signup);
userRouter.post("/follow", follow);
userRouter.post("/unfollow", unfollow);

userRouter.get("/userWithPost", async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await userModel
      .find({ userId })
      .populate("posts", "postImage caption userId");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = userRouter;
