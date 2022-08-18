const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const { mongoDBUri } = require("./config");

try {
  mongoose.connect(mongoDBUri).then(() => {
    console.log("DB Connected");
  });
} catch (error) {
  console.log(error);
}
