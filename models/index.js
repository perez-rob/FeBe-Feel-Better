const User = require("./User");
const Activity = require("./Activity");
const Mood = require("./Mood");

// User.belongsToMany(Activity, {
//   through: {
//     model: UserActivity,
//   },
//   foreignKey: "user_id",
// });

// Activity.belongsToMany(User, {
//   through: {
//     model: UserActivity,
//   },
//   foreignKey: "activity_id",
// });

// User.belongsToMany(Mood, {
//   through: {
//     model: UserMood,
//   },
//   foreignKey: "user_id",
// });

// Mood.belongsToMany(User, {
//   through: {
//     model: UserMood,
//   },
//   foreignKey: "mood_id",
// });

module.exports = {
  User,
  Activity,
  Mood,
};
