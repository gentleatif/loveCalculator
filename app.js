const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
mongoose.connect(
  "mongodb+srv://gentleatif:a82268T@@cluster0.o0zy1.mongodb.net/loversDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
let firstName = "";
let secondName = "";
const loverSchema = new mongoose.Schema({
  name: String,
  crushName: String,
});
const Lover = mongoose.model("Lover", loverSchema);
app.get("/", function (req, res) {
  res.render("home");
});
app.post("/", function (req, res) {
  firstName = req.body.firstName;
  secondName = req.body.secondName;

  Lover.findOne({ name: firstName }, function (err, findLover) {
    if (!findLover) {
      const lover = new Lover({
        name: firstName,
        crushName: secondName,
      });
      lover.save();
    }

    res.redirect("/calculate");
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/calculate", function (req, res) {
  var randomNo = "";
  if (firstName === "Zurraik") {
    randomNo = 100;
  } else {
    randomNo = Math.floor(Math.random() * 100 + 1);
  }
  res.render("result", { data: randomNo });
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
