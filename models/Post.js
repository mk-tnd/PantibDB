module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    "Posts",
    {
      TopicName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Images: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Recommend: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Likes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Commend: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Posts.belongsTo(models.Zones, {
      foreignKey: {
        name: "ZoneId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Posts.hasMany(models.Commends, {
      foreignKey: {
        name: "PostsId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Posts.hasMany(models.Promotes, {
      foreignKey: {
        name: "PLikeId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Posts;
};
