const { Zones } = require("../models");

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
