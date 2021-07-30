const User = require("./User");
const Activity = require("./Activity");
const Mood = require("./Mood");
const AUM = require("./AUM");

User.belongsToMany(Activity, {
  through: AUM,
  foreignKey: "user_id",
  otherKey: "activity_id",
});

Activity.belongsToMany(User, {
  through: AUM,
  foreignKey: "activity_id",
  otherKey: "user_id",
});

// User.belongsToMany(Mood, {
//   through: AUM,
//   foreignKey: "user_id",
//   otherKey: "mood_id",
// });

// Mood.belongsToMany(User, {
//   through: AUM,
//   foreignKey: "mood_id",
//   otherKey: "user_id",
// });

// Mood.belongsToMany(Activity, {
//   through: AUM,
//   foreignKey: "mood_id",
//   otherKey: "activity_id",
// });

// Activity.belongsToMany(Mood, {
//   through: AUM,
//   foreignKey: "activity_id",
//   otherKey: "mood_id",
// });

module.exports = {
  User,
  Activity,
  Mood,
  AUM,
};
