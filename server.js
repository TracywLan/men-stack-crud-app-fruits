const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");  // express
const Fruit = require("./models/fruit") // import fruit schema

const app = express();


// Middleware
require('./db/connection') // Load in this JS and connect to MongDB
// allow my app to use form data
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
// landing page
app.get("/", async (req, res) => {
  res.render("index.ejs");
});


// I.N.D.U.C.E.S
// INDEX - get /fruits - render all fruits
app.get("/fruits", async (req, res) => {
const allFruits = await Fruit.find()
res.render('fruits/index.ejs', { allFruits })
});
// NEW - get /fruits/new - render the new fruits form
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// DELETE - delete /fruits/:fruitID - Delete a specific Fruits from the DB

// UPDATE - put /fruits/:fruitsId(req.body) - Update a specific fruits using req.body


// CREATE - post /fruits - Use the req.body to create a new Fruit
// server.js
app.post("/fruits", async (req, res) => {
  console.log(req.body);
  res.redirect("/fruits/new");
});

// POST /fruits
// change ready to eat from string to bool
app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect("/fruits/new");
});


// EDIT - get /fruits/:fruitID/edit - render a pre populated form to edit the fruit

// SHOW - get/fruits/:fruitsId - Render a specific fruit from the database






app.listen(3000, () => {
  console.log('Listening on port 3000');
});

