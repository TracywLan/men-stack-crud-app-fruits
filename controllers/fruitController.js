const Fruit = require("../models/fruit");
const express = require("express");
const router = express.Router();

// I.N.D.U.C.E.S
// INDEX - get /fruits - render all fruits
router.get("/fruits", async (req, res) => {
const allFruits = await Fruit.find()
res.render('fruits/index.ejs', { allFruits })
});


// NEW - get /fruits/new - render the new fruits form
router.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});


// DELETE - delete /fruits/:fruitID - Delete a specific Fruits from the DB
router.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
})


// UPDATE - put /fruits/:fruitsId(req.body) - Update a specific fruits using req.body
router.put("/fruits/:fruitId", async (req, res) => {
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
router.post("/fruits", async (req, res) => {
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
router.get("/fruits/:fruitId/edit", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/edit.ejs", { fruit: foundFruit });
});



// SHOW - get/fruits/:fruitsId - Render a specific fruit from the database
router.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show.ejs", { fruit: foundFruit });
});

module.exports = router