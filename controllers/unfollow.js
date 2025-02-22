const { userModel } = require("../models/userSchema");

const unfollow = async (req, res) => {
  const { unfollowingUserId, unfollowedUserId } = req.body;
  try {
    await userModel.findByIdAndUpdate(unfollowingUserId, {
      $pull: {
        following: unfollowedUserId,
      },
    });
    await userModel.findByIdAndUpdate(unfollowedUserId, {
      $pull: {
        followers: unfollowingUserId,
      },
    });
    res.status(200).send({ message: "done" });
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = unfollow;
