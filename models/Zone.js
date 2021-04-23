module.exports = (sequelize, DataTypes) => {
  const Zones = sequelize.define(
    "Zones",
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

  Zones.associate = (models) => {
    Zones.hasMany(models.Posts, {
      foreignKey: {
        name: "ZoneId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Zones;
};
