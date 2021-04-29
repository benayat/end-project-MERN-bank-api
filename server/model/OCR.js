const mongoose = require("mongoose");

const Ocr = mongoose.model("ocr", {
  keyProp: {
    type: String,
    required: true,
    minLength: 2,
    // validate(value) {
    //   if (!/^[a-zA-Z]+$/.test(value))
    //     throw new Error("keyProp can only be an alphabetic word!");
    // },
  },
  base64Image: {
    type: String,
    required: true,
  },
});
module.exports = Ocr;
