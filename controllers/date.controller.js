const dateModel = require("../models/date.model");

/* This function returns the current date by the format: dd/mm/yyyy */
const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

/* This function adds new user to the current date in the database */
const add_user = async (req, res) => {
  const fullDate = getCurrentDate();
  const query = { date: req.body.fullDate };
  const update = { $push: { users: req.body.user } };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };


  try {
    await dateModel.findOneAndUpdate(query, update, options);
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false });
  }
};

/* This function gives all the users from the current date which inside the database */
const get_users = async (req, res) => {
  const fullDate = getCurrentDate();
  try {
    const users = await dateModel.findOne({ date: fullDate });
    res.status(200).send(users.users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const get_hours = async (req, res) => {
  const fullDate = getCurrentDate();
  const allHours = ["20:00", "20:45", "21:30", "22:15"];
  console.log('THe full date is ====> ', req.body.fullDate);
  const query = { date: req.body.fullDate };
  const update = {};
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  
  await dateModel.findOneAndUpdate(query, update, options);
  
  dateModel
    .aggregate([
      {
        $match: {
          date: req.body.fullDate,
        },
      },
      {
        $group: {
          _id: null,
          hours: { $push: "$users.hour" },
        },
      },
      {
        $unwind: '$hours',
      },
      {
        $project: {
          availableHours: {
            $filter: {
              input: allHours,
              cond: {
                $not: {
                  $in: ["$$this", "$hours"],
                },
              },
            },
          },
        },
      },
    ])
    .exec()
    .then((result) => {
      console.log('The result is ====> ', result);
      res.status(200).send(result);
    });
};

module.exports = {
  add_user,
  get_users,
  get_hours,
};
