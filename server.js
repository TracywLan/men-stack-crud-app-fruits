const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");  // express
const Fruit = require("./models/fruit") // import fruit schema
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");
const fruitController = require("./controllers/fruitController")


// Middleware
require('./db/connection') // Load in this JS and connect to MongDB
// allow my app to use form data
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.use(fruitController)


// landing page
app.get("/", async (req, res) => {
  res.render("index.ejs", { allFruits: [], currentPage: "home" });
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

