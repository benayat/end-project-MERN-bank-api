const BankAccount = require("../model/BankAccount");
const { find, findById } = require("../model/Transaction");
const Transaction = require("../model/Transaction");
const Client = require("../model/Client");
const create = async (req, res) => {
  try {
    let bankAccount = new BankAccount(req.body);
    let validateClientExist = await Client.find({
      passportID: req.body.belongsToPassportId,
    });
    if (validateClientExist.length === 0)
      throw new Error("client dosn't exist, try again with a real client");
    await bankAccount.save();
    res.status(201).send(bankAccount);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const getAll = async (req, res) => {
  try {
    const bankaccounts = await BankAccount.find({});
    res.status("201").send(bankaccounts);
  } catch (e) {
    res.status(404).send(e);
  }
};
const getAllActive = async (req, res) => {
  try {
    const activeBankAccounts = await BankAccount.find({ isActive: true });
    res.status(200).send(activeBankAccounts);
  } catch (e) {
    res.status(404).send(e);
  }
};
const getAllInRange = async (req, res) => {
  try {
    const { min, max } = req.query;
    console.log(min, max);
    const bankaccounts = await BankAccount.find({
      balance: { $gte: min, $lte: max },
    });
    res.status(200).send(bankaccounts);
  } catch (e) {
    res.status("404").send(e);
  }
};
const getById = async (req, res) => {
  try {
    const bankAccount = await BankAccount.findById(req.params.id);
    res.status("200").send(bankAccount);
  } catch (e) {
    res.status("404").send(e);
  }
};
const getByPassportId = async (req, res) => {
  try {
    const bankAccount = await BankAccount.find({
      belongsToPassportId: req.params.id,
    });
    res.status(200).send(bankAccount);
  } catch (e) {
    res.status(404).send(e);
  }
};

const updateHelper = async (id, updateObject) => {
  console.log(id, updateObject);
  const bankAccount = await BankAccount.findById(id);
  const options = {
    new: true,
    runValidators: true,
    context: "query",
    credit: bankAccount.credit,
  };
  return await BankAccount.findByIdAndUpdate(id, updateObject, options);
};
const updateById = async (req, res) => {
  try {
    const updateResult = await updateHelper(req.params.id, req.body);
    res.status(201).send(updateResult);
  } catch (e) {
    res.status("404").send(e);
  }
};
const deleteById = async (req, res) => {
  try {
    const deleteResult = await BankAccount.findByIdAndDelete(req.params.id);
    res.status("200").send(deleteResult);
  } catch (e) {
    res.status("500").send(e);
  }
};

module.exports = {
  create,
  getAll,
  getAllActive,
  getAllInRange,
  getById,
  getByPassportId,
  updateById,
  deleteById,
  updateHelper,
};
