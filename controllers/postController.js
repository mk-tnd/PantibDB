const { Posts, Users } = require("../models");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Posts.findAll({
      order: [["createdAt", "desc"]],
      include: {
        model: Users,
        attributes: ["id", "FirstName", "LastName", "ProfileImg"],
      },
      attributes: [
        "id",
        "TopicName",
        "Images",
        "Details",
        "Recommend",
        "Likes",
        "Commend",
        "createdAt",
        "updatedAt",
      ],
    });
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

exports.getAllMyPosts = async (req, res, next) => {
  try {
    const posts = await Posts.findAll({
      where: {
        UserId: req.user.id,
      },
      order: [["createdAt", "desc"]],
      include: {
        model: Users,
        attributes: ["id", "FirstName", "LastName", "ProfileImg"],
      },
      attributes: [
        "id",
        "TopicName",
        "Images",
        "Details",
        "Recommend",
        "Commend",
        "Likes",
        "createdAt",
        "updatedAt",
      ],
    });
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

exports.getRecPosts = async (req, res, next) => {
  try {
    const posts = await Posts.findAll({
      order: [["Recommend", "desc"]],
      include: {
        model: Users,
        attributes: ["id", "FirstName", "LastName", "ProfileImg"],
      },
      attributes: [
        "id",
        "TopicName",
        "Images",
        "Details",
        "Recommend",
        "Commend",
        "Likes",
        "createdAt",
        "updatedAt",
      ],
      limit: 5,
    });
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

exports.getTopPosts = async (req, res, next) => {
  try {
    const posts = await Posts.findAll({
      order: [["Likes", "desc"]],
      include: {
        model: Users,
        attributes: ["id", "FirstName", "LastName", "ProfileImg"],
      },
      attributes: [
        "id",
        "TopicName",
        "Images",
        "Details",
        "Recommend",
        "Commend",
        "Likes",
        "createdAt",
        "updatedAt",
      ],
      limit: 3,
    });
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const posts = await Posts.findOne({
      where: {
        id: postId,
      },
      include: {
        model: Users,
        attributes: ["id", "FirstName", "LastName", "ProfileImg"],
      },
      attributes: [
        "id",
        "TopicName",
        "Images",
        "Details",
        "Recommend",
        "Commend",
        "Likes",
        "createdAt",
        "updatedAt",
      ],
    });
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { TopicName, Images, Details, zoneId } = req.body;
    if (req.file) {
      cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) return next(err);
        const posts = await Posts.create({
          TopicName,
          Images: result.secure_url || null,
          Details,
          Recommend: 0,
          Likes: 0,
          Commend: 0,
          UserId: req.user.id,
          ZoneId: zoneId,
        });
        fs.unlinkSync(req.file.path);
        res.status(200).json({ posts });
      });
    } else {
      const posts = await Posts.create({
        TopicName,
        Images: null,
        Details,
        Recommend: 0,
        Likes: 0,
        Commend: 0,
        UserId: req.user.id,
        ZoneId: zoneId,
      });

      res.status(200).json({ posts });
    }
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Posts.findOne({ where: { id } });
    if (!post) return res.status(400).json({ message: "post not found" });
    if (post.UserId !== req.user.id)
      return res
        .status(400)
        .json({ message: `cannot delete other user's post` });
    await post.destroy();
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
