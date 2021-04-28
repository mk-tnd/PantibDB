const { Posts, Users } = require("../models");

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
        userId: req.user.id,
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
    const { TopicName, Details, zoneId } = req.body;
    const posts = await Posts.create({
      TopicName,
      Images: null,
      Details,
      Recommend: 0,
      Likes: 0,
      Commend: 0,
      userId: req.user.id,
      UserId: req.user.id,
      ZoneId: zoneId,
    });
    res.status(201).json({ posts });
  } catch (err) {
    next(err);
  }
};
