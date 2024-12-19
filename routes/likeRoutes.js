const Router = require("express");

const like = require("../controllers/like");
const { postModel } = require("../models/postSchema");
const { likeModel } = require("../models/likeSchema");

const likeRouter = Router();

likeRouter.post("/post/like", like);

likeRouter.get("/post/doublePopulate", async (req, res) => {
  try {
    const response = await postModel.find().populate({
      path: "likes",
      populate: { path: "userId", select: "username email profileImage" },
    });
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});
likeRouter.get("/post/likedUsers/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const response = await likeModel.find({ postId }).populate({
      path: "userId",
      select: "username email profileImage",
    });
    console.log(response);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = likeRouter;
