module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define(
    "Followers",
    {
      ZoneName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Images: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Followers.associate = (models) => {
    Followers.belongsTo(models.Users, {
      as: "requestTo",
      foreignKey: {
        name: "RequestTo",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
    Followers.belongsTo(models.Users, {
      as: "requestFrom",
      foreignKey: {
        name: "RequestFrom",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return Followers;
};
