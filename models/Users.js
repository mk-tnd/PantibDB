module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ProfileImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Details: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      Status: {
        type: DataTypes.ENUM,
        values: ["ADMIN", "USER"],
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      foreignKey: {
        name: "UserId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Users.hasMany(models.Followers, {
      as: "requestTo",
      foreignKey: {
        name: "RequestTo",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Users.hasMany(models.Followers, {
      as: "requestFrom",
      foreignKey: {
        name: "RequestFrom",
        allowNull: false,
      },
      onDelete: "RESTIRCT",
      onUpdate: "RESTRICT",
    });
    Users.hasMany(models.Commends, {
      foreignKey: {
        name: "UsersId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Users.hasMany(models.Promotes, {
      foreignKey: {
        name: "ULikeId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Users;
};
