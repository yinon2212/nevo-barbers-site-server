const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/user.model');
const userRouter = require('./routes/user.route');
const bp = require('body-parser');
const cors = require('cors');
const port = 5000;

mongoose.connect('mongodb://localhost:27017/usersdb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express();

app.use(cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

