const BankAccount = require("../model/BankAccount");
const Transaction = require("../model/Transaction");
const { updateHelper } = require("./BankAccount");
const create = async (req, res) => {
  try {
    const session = await BankAccount.startSession();
    session.startTransaction();
    let transaction = new Transaction(req.body);
    const balanceBeforeWithdrawFrom = (
      await BankAccount.findById(req.body.fromAccountId, "balance")
    ).balance;
    const balanceBeforeDepositTo = (
      await BankAccount.findById(req.body.toAccountID, "balance")
    ).balance;
    const withdtawResult = await updateHelper(req.body.fromAccountId, {
      balance: balanceBeforeWithdrawFrom - req.body.transferAmount,
    });
    const depositResult = await updateHelper(req.body.toAccountID, {
      balance: balanceBeforeDepositTo + req.body.transferAmount,
    });
    await transaction.save();
    await session.commitTransaction();
    session.endSession();
    res.status("200").send([withdtawResult, depositResult]);
  } catch (e) {
    res.status(400).send(e);
  }
};
const getAll = async (req, res) => {
  try {
    console.log("starting transaction");
    const transactions = await Transaction.find({});

    res.status("201").send(transactions);
  } catch (e) {
    res.status(404).send(e);
  }
};

const getAllInRange = async (req, res) => {
  try {
    const { min, max } = req.query;
    const transactions = await Transacion.find({
      transferAmount: { $gte: min, $lte: max },
    });
    res.status(200).send(transactions);
  } catch (e) {
    res.status("404").send(e);
  }
};
const getById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.status("200").send(transaction);
  } catch (e) {
    res.status("404").send(e);
  }
};
const getAllByPassportId = async (req, res) => {
  try {
    const transactions = await Transaction.find({ passportID: req.params.id });
  } catch (e) {
    res.status("404").send(e);
  }
};

module.exports = {
  create,
  getAll,
  getAllInRange,
  getById,
  getAllByPassportId,
};
