const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class AUM extends Model {}

// ??? MIGHT NOT NEED date_time HERE ??? //

AUM.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    mood_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: "mood",
        key: "id",
      },
    },
    activity_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: "activity",
        key: "id",
      },
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    result: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "aum",
  }
);

module.exports = AUM;
