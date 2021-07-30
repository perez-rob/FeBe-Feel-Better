const User = require("./User");
const Activity = require("./Activity");
const Mood = require("./Mood");
const AUM = require("./AUM");

User.belongsToMany(Activity, {
  through: AUM,
  sourceKey: "user_id",
  targetKey: "activity_id",
});

Activity.belongsToMany(User, {
  through: AUM,
  sourceKey: "activity_id",
  targetKey: "user_id",
});

User.belongsToMany(Mood, {
  through: AUM,
  sourceKey: "user_id",
  targetKey: "mood_id",
});

Mood.belongsToMany(User, {
  through: AUM,
  sourceKey: "mood_id",
  targetKey: "user_id",
});

Mood.belongsToMany(Activity, {
  through: AUM,
  sourceKey: "mood_id",
  targetKey: "activity_id",
});

Activity.belongsToMany(Mood, {
  through: AUM,
  sourceKey: "activity_id",
  targetKey: "mood_id",
});

module.exports = {
  User,
  Activity,
  Mood,
  AUM,
};
