const { Schema, default: mongoose } = require("mongoose");
const likeSchema = new Schema({
  userId: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
  postId: { type: mongoose.Types.ObjectId, ref: "Post" },
});
const likeModel = mongoose.model("Like", likeSchema);
module.exports = { likeModel };
