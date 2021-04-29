const mongoose = require("mongoose");
const BankAccount = mongoose.model("bankaccount", {
  belongsToPassportId: {
    type: String,
    required: true,
    minLength: 9,
    maxLength: 9,
  },
  balance: {
    type: Number,
    default: 0,
    validate: {
      validator: function (value) {
        if (value > 0 || this.balance === 0) {
          return true;
        } else {
          return value >= -this.options.credit;
        }
      },
      message: "can't update, insuficient funds!",
    },
  },
  credit: {
    type: Number,
    min: 0,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
module.exports = BankAccount;
