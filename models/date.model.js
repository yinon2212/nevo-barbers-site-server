const mongoose = require("mongoose");

const DateSchema = mongoose.Schema({
  date: "string",
  users: [
    {
      fullName: "string",
      phone: "string",
      hour: "string",
    },
  ],
});

const Date = mongoose.model("Date", DateSchema);

module.exports = Date;
