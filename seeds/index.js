const sequelize = require("../config/connection");
const { User, Mood, Activity, AUM } = require("../models");

const userData = require("./userData.json");
const moodData = require("./moodData.json");
const activityData = require("./activityData.json");
const aumData = require("./aumData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
  });

  await Mood.bulkCreate(moodData);

  await Activity.bulkCreate(activityData);

  await AUM.bulkCreate(aumData);

  process.exit(0);
};

seedDatabase();
