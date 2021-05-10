const { Zones, Posts, Users } = require("../models");

exports.getAllZone = async (req, res, next) => {
  try {
    const zone = await Zones.findAll({
      attributes: ["id", "ZoneName", "Images", "Details"],
    });
    res.status(200).json({ zone });
  } catch (err) {
    next(err);
  }
};

exports.getAllPostInZone = async (req, res, next) => {
  try {
    const { zid } = req.params;
    const postszone = await Posts.findAll({
      where: {
        ZoneId: zid,
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
    res.status(200).json({ postszone });
  } catch (err) {
    next(err);
  }
};
