const { commentModel } = require("../models/commentsSchema");
const { postModel } = require("../models/postSchema");

const comments = async (req, res) => {
  const { userId, comment, postId } = req.body;
  try {
    const createComment = await commentModel.create({
      userId: userId,
      comment,
      postId,
    });
    const response = await postModel.findByIdAndUpdate(postId, {
      $push: {
        comments: createComment._id,
      },
    });
    res.send(response);
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = comments;
