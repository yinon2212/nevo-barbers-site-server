const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/user.model");
const userRouter = require("./routes/user.route");
const dateRouter = require("./routes/date.route");
const bp = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';

mongoose.connect("mongodb+srv://yinonmegi2212:22122001Ym!@cluster0.ddsjecv.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express();

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/date", dateRouter);

app.get("/", (req, res) => {
  res.send('Hi im here!')
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
