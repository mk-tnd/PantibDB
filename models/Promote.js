module.exports = (sequelize, DataTypes) => {
  const Promotes = sequelize.define("Promotes");

  Promotes.associate = (models) => {
    Promotes.belongsTo(models.Posts, {
      foreignKey: {
        name: "PLikeId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Promotes.belongsTo(models.Users, {
      foreignKey: {
        name: "ULikeId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Promotes.belongsTo(models.Commends, {
      foreignKey: {
        name: "CLikeId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Promotes;
};
