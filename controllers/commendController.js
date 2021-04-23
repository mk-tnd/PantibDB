const { Commends } = require("../models");

exports.createCommends = async (req, res, next) => {
  try {
    const { PostId } = req.params;
    const { Text, PostsId } = req.body;
    const posts = await Commends.create({
      Agree: 0,
      Text,
      PostsId: PostsId,
      UserId: req.user.id,
      CLikeId,
    });
    res.status(201).json({ posts });
  } catch (err) {
    next(err);
  }
};

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
