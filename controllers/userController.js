const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

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
  const { id, FirstName, LastName, ProfileImg, Details, Email } = req.user;
  res.status(200).json({
    user: {
      id,
      FirstName,
      LastName,
      ProfileImg,
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
      ProfileImg,
    } = req.body;
    if (Password !== ConfirmPassword)
      return res.status(400).json({ message: "password not match" });
    const hashedPassword = await bcrypt.hash(
      Password,
      +process.env.BCRYPT_SALT
    );
    if (req.file) {
      cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) return next(err);
        const user = await Users.create({
          FirstName,
          LastName,
          ProfileImg: result.secure_url,
          Details: null,
          Username,
          Password: hashedPassword,
          Email,
          Status: "User",
        });
        fs.unlinkSync(req.file.path);
        res.status(200).json({ user });
      });
    } else {
      const user = await Users.create({
        FirstName,
        LastName,
        ProfileImg: null,
        Details: null,
        Username,
        Password: hashedPassword,
        Email,
        Status: "User",
      });
      res.status(200).json({ user });
    }
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

exports.updateUser = async (req, res, next) => {
  try {
    const { FirstName, LastName, Email, Details } = req.body;
    await Users.update(
      { FirstName, LastName, Email, Details },
      { where: { id: req.user.id } }
    );
    res.status(200).json({ message: "update user success" });
  } catch (err) {
    next(err);
  }
};

exports.updateUserImg = async (req, res, next) => {
  try {
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) return next(err);
      await Users.update(
        { ProfileImg: result.secure_url },
        { where: { id: req.user.id } }
      );
      fs.unlinkSync(req.file.path);
      res.status(200).json({ message: "update user success" });
    });
  } catch (err) {
    next(err);
  }
};
