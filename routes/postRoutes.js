const Router = require("express");
const postRouter = Router();

const post = require("../controllers/createPost");
const comments = require("../controllers/comment");

const { postModel } = require("../models/postSchema");
const { commentModel } = require("../models/commentsSchema");

postRouter.post("/createPost", post);
postRouter.post("/comment", comments);

postRouter.get("/comments/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await commentModel.find({ postId }).populate("userId");
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
