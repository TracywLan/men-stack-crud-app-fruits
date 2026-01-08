const mongoose = require("mongoose");

// Create the schema
const fruitSchema = new mongoose.Schema({
    name:String,
    isReadyToEat:Boolean,
});

// Link schema to a Model
const Fruit = mongoose.model("Fruit", fruitSchema); // create model


// Export the Model
module.exports = Fruit;
