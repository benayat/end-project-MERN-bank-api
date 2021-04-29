const mongoose = require("mongoose");

const Client = mongoose.model("client", {
  name: {
    type: String,
    required: true,
    minLength: 2,
    validate(value) {
      if (value.split(" ").length < 2)
        throw new Error("please insert both first and last name!");
    },
  },
  passportID: {
    type: String,
    required: true,
    unique: true,
    minLength: 9,
    maxLength: 9,
  },
});
module.exports = Client;
