const Router = require("express");
const postRouter = Router();

const post = require("../controllers/createPost");
const comments = require("../controllers/comment");

const { postModel } = require("../models/postSchema");

postRouter.post("/createPost", post);
postRouter.post("/comment", comments);

postRouter.get("/postWithComments", async (req, res) => {
  try {
    const comments = await postModel
      .find()
      .populate("comments", "postId comment userId");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = postRouter;
