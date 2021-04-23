const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

exports.protect = async (req, res, next) => {
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "you are unauthorized" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({ where: { id: payload.id } });
    if (!user) return res.status(400).json({ message: "user not found" });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.me = (req, res, next) => {
  const { id, FirstName, LastName, profileImg, Details, Email } = req.user;
  res.status(200).json({
    user: {
      id,
      FirstName,
      LastName,
      profileImg,
      Details,
      Email,
    },
  });
};

exports.register = async (req, res, next) => {
  try {
    const {
      Username,
      Password,
      ConfirmPassword,
      FirstName,
      LastName,
      Email,
    } = req.body;
    if (Password !== ConfirmPassword)
      return res.status(400).json({ message: "password not match" });
    const hashedPassword = await bcrypt.hash(
      Password,
      +process.env.BCRYPT_SALT
    );
    await Users.create({
      FirstName,
      LastName,
      ProfileImg: null,
      Details: null,
      Username,
      Password: hashedPassword,
      Email,
      Status: "User",
    });
    res.status(201).json({ message: "Register success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username } });
    if (!user)
      return res
        .status(400)
        .json({ message: "username or password incorrect" });

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "username or password incorrect" });

    const payload = {
      id: user.id,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: +process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
