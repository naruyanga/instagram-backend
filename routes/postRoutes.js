const Router = require("express");
const postRouter = Router();

const post = require("../controllers/createPost");
const comments = require("../controllers/comment");

const { postModel } = require("../models/postSchema");

postRouter.post("/createPost", post);
postRouter.post("/comment", comments);

postRouter.get("/comments", async (req, res) => {
  try {
    const comments = await postModel
      .find()
      .populate("comments", "postId comment userId");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});
postRouter.get("/posts", async (req, res) => {
  const posts = await postModel
    .find()
    .populate("userId", "email username _id")
    .populate({
      path: "likes",
      populate: {
        path: "userId",
        select: "username profileImage ",
      },
    });
  res.send(posts);
});
module.exports = postRouter;
