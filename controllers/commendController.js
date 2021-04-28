const { Commends, Posts, Users } = require("../models");

exports.createCommend = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    console.log(text);
    const commend = await Commends.create({
      Agree: 0,
      Text: text,
      PostsId: postId,
      UsersId: req.user.id,
    });
    const post = await Posts.findOne({ where: { id: postId } });
    await Posts.update(
      {
        Commend: post.Commend + 1,
      },
      { where: { id: postId } }
    );
    res.status(201).json({ commend });
  } catch (err) {
    next(err);
  }
};

exports.getAllCommend = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const commends = await Commends.findAll({
      where: { PostsId: postId },
      order: [["createdAt", "desc"]],
      include: {
        model: Users,
        attributes: ["id", "FirstName", "LastName", "ProfileImg"],
      },
      attributes: [
        "id",
        "Agree",
        "Text",
        "createdAt",
        "updatedAt",
        "PostsId",
        "UsersId",
      ],
    });
    res.status(200).json({ commends });
  } catch (err) {
    next(err);
  }
};
