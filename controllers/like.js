const { likeModel } = require("../models/likeSchema");
const { postModel } = require("../models/postSchema");

const like = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const likeResponse = await likeModel.create({
      userId,
      postId,
    });
    const response = await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        likes: likeResponse._id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = like;
