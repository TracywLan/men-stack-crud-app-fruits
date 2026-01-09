const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");  // express
const Fruit = require("./models/fruit") // import fruit schema
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
 const path = require("path");

// Middleware
require('./db/connection') // Load in this JS and connect to MongDB
// allow my app to use form data
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// app.use(morgan("dev"));
 app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');


// Routes
// landing page
app.get("/", async (req, res) => {
  res.render("index.ejs", { allFruits: [], currentPage: "home" });
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
app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
})


// UPDATE - put /fruits/:fruitsId(req.body) - Update a specific fruits using req.body
app.put("/fruits/:fruitId", async (req, res) => {
  // Handle the 'isReadyToEat' checkbox data
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  
  // Update the fruit in the database
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);

  // Redirect to the fruit's show page to see the updates
  res.redirect(`/fruits/${req.params.fruitId}`);
});


// CREATE - post /fruits - Use the req.body to create a new Fruit
// change ready to eat from string to bool
app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect("/fruits/");
});


// EDIT - get /fruits/:fruitID/edit - render a pre populated form to edit the fruit
// server.js
app.get("/fruits/:fruitId/edit", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/edit.ejs", { fruit: foundFruit });
});



// SHOW - get/fruits/:fruitsId - Render a specific fruit from the database
app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show.ejs", { fruit: foundFruit });
});



// 404 page (must be last!)
// this at the bottom to avoid being caught by any other route
app.use((req, res) => {
  res.status(404).render('404');
});


// port
app.listen(3000, () => {
  console.log('Fruits at port 3000');
});

