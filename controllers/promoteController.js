const { Posts, Users, Promotes } = require("../models");

exports.like = async (req, res, next) => {
  try {
    const { PostId } = req.params;
    await Promotes.create({
      PLikeId: PostId,
      ULikeId: req.user.id,
    });
    const post = await Posts.findOne({ where: { id: PostId } });
    await Posts.update(
      {
        Likes: post.Likes + 1,
      },
      { where: { id: PostId } }
    );
    res.status(201).json({ message: "liked" });
  } catch (err) {
    next(err);
  }
};

exports.getAllUserlike = async (req, res, next) => {
  try {
    const promote = await Promotes.findAll({
      where: { ULikeId: req.user.id },
      attributes: ["PLikeId"],
    });
    res.status(200).json({ promote });
  } catch (err) {
    next(err);
  }
};
