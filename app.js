const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/read", async function (req, res) {
  let user = await userModel.find();
  res.render("read", { user });
});

app.get("/edit/:userid", async function (req, res) {
  let user =  await userModel.findOne({_id: req.params.userid})
  res.render("edit", {user});
});

app.post("/update/:userid", async function (req, res) {
  let { name, email, image } = req.body;
  let user =  await userModel.findOneAndUpdate({_id: req.params.userid} , {image, name , email} ,{new :true})
  res.redirect("/read");
});


app.get("/delete/:id", async function (req, res) {
  let user = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  let createduser = await userModel.create({
    name,

    email,
    image
  });
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
