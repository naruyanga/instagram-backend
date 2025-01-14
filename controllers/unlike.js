const { postModel } = require("../models/postSchema");

const disLike = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const response = await postModel.findByIdAndUpdate(postId, {
      $pull: {
        likes: userId,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = disLike;
