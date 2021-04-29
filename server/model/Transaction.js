const mongoose = require("mongoose");

const Transaction = mongoose.model("transaction", {
  fromAccountId: {
    type: String,
    required: true,
  },
  toAccountID: {
    type: String,
    required: true,
  },
  transferAmount: {
    type: Number,
    required: true,
    min: 0,
  },
});
module.exports = Transaction;
