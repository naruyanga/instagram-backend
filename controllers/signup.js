const { userModel } = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const signup = async (req, res) => {
  const userData = req.body;
  const password = userData.password;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const data = { ...userData, password: hashedPassword };
  try {
    const createdUser = await userModel.create(data);
    const token = jwt.sign(
      { userId: createdUser._id, username: createdUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = signup;
