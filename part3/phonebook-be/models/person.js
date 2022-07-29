const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error connecting database", err);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
