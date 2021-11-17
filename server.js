const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const users = require("./routes/api/users");
const courses = require("./routes/api/courses");
const assignments = require('./routes/api/assignments')
const chats = require("./routes/api/chats");
const chatrooms = require("./routes/api/chatrooms");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

 // Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/courses", courses);
app.use("/api/assignments", assignments);
app.use("/api/chats", chats);
app.use("/api/chatrooms", chatrooms);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
if(process.env.NODE_ENV !== 'test'){
  app.listen(port, () => console.log(`Server up and running on port ${port} !`));
}

module.exports = app