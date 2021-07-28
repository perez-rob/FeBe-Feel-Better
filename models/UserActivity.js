const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserActivity extends Model {}

UserActivity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    activity_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "activity",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user_activity",
  }
);

module.exports = UserActivity;
