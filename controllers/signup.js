const { userModel } = require("../models/userSchema");

const bcrypt = require("bcrypt");
const signup = async (req, res) => {
  const userData = req.body;
  const password = userData.password;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const data = { ...userData, password: hashedPassword };
  try {
    await userModel.create(data);
    res.status(200).send({ message: "user created" });
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = signup;
