const User = require("./User");
const Activity = require("./Activity");
const Mood = require("./Mood");
const AUM = require("./AUM");

User.hasMany(AUM, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

AUM.belongsTo(User, {
  foreignKey: "user_id",
});

Activity.hasMany(AUM, {
  foreignKey: "activity_id",
  onDelete: "SET NULL",
});

AUM.belongsTo(Activity, {
  foreignKey: "activity_id",
});

Mood.hasMany(AUM, {
  foreignKey: "mood_id",
  onDelete: "SET NULL",
});

AUM.belongsTo(Mood, {
  foreignKey: "mood_id",
});
module.exports = {
  User,
  Activity,
  Mood,
  AUM,
};
