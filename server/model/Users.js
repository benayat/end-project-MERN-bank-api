const mongoose = require("mongoose");

function nameValidator(value) {
  console.log(value);
  return /[a-zA-Z]+/.test(value);
}

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      validate: {
        validator: nameValidator,
        message: "first name must be only letters and one word",
      },
    },
    lastName: {
      type: String,
      required: true,
      validate: {
        validator: nameValidator,
        message: "last name must contain only letters",
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("user", schema);

module.exports = User;
