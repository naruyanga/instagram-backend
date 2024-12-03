const Router = require("express");

const like = require("../controllers/like");
const { postModel } = require("../models/postSchema");

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

module.exports = likeRouter;
