const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserMood extends Model {}

UserMood.init(
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
    mood_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "mood",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user_mood",
  }
);

module.exports = UserMood;
