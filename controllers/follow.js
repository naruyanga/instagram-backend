const { userModel } = require("../models/userSchema");

const follow = async (req, res) => {
  const { followingUserId, followerUserId } = req.body;
  if (followingUserId === followerUserId)
    throw new Error("cannot follow yourself");
  try {
    const following = await userModel.findByIdAndUpdate(followingUserId, {
      $addToSet: {
        following: followerUserId,
      },
    });
    const followers = await userModel.findByIdAndUpdate(followerUserId, {
      $addToSet: {
        followers: followingUserId,
      },
    });
    res.status(200).send("done");
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = follow;
