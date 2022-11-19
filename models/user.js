const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  passwordHash: String,
  physicsCorrect: Number,
  physicsTotal: Number,
  chemistryCorrect: Number,
  chemistryTotal: Number,
  biologyCorrect: Number,
  biologyTotal: Number,
  bestCorrect: Number,
  bestTotal: Number,
  bestCategory: String,
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
