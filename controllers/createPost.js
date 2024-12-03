const { postModel } = require("../models/postSchema");
const { userModel } = require("../models/userSchema");
const post = async (req, res) => {
  try {
    const { caption, postImage, userId } = req.body;
    const createdPost = await postModel.create({
      caption,
      postImage,
      userId,
    });
    const result = await userModel.findByIdAndUpdate(userId, {
      $push: {
        posts: createdPost._id,
      },
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    // throw new Error(error);
  }
};
module.exports = post;
