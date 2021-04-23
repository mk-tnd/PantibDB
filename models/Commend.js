module.exports = (sequelize, DataTypes) => {
  const Commends = sequelize.define(
    "Commends",
    {
      Agree: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Commends.associate = (models) => {
    Commends.belongsTo(models.Posts, {
      foreignKey: {
        name: "PostsId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    Commends.belongsTo(models.Users, {
      foreignKey: {
        name: "UsersId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      opDelete: "RESTRICT",
    });

    Commends.hasMany(models.Promotes, {
      foreignKey: {
        name: "CLikeId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Commends;
};
