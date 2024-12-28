const { userModel } = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await userModel.findOne({ email: email, username: username });
    const hashedPassword = user.password;
    const isUser = await bcrypt.compareSync(password, hashedPassword);
    if (isUser) {
      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.json("amjilttai nevterlee", {
        token,
      });
    } else {
      res.send("wrong password or email");
    }
  } catch (error) {
    res.status(500).send(console.log(error));
  }
};
module.exports = login;
