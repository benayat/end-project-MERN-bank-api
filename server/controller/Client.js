const Client = require("../model/Client");
const BankAccount = require("../model/BankAccount");
const Transaction = require("../model/Transaction");
const assert = require("assert");
const create = async (req, res) => {
  try {
    console.log(req.body);
    let client = new Client(req.body);
    await client.save();
    res.status(201).send(client);
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e);
  }
};
const getAll = async (req, res) => {
  try {
    console.log("action: get all from client db");
    const clients = await Client.find({});
    res.status("201").send(clients);
  } catch (e) {
    res.status(404).send(e);
  }
};

const getById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    res.status("200").send(client);
  } catch (e) {
    res.status("404").send(e);
  }
};
const getByPassportId = (req, res) => {
  try {
    const client = Client.find({ passportID: req.params.id });
    res.status("200").send(client);
  } catch (e) {
    res.status("404").send(e);
  }
};
//update is only for name which can b changed
const updateByPassportId = async (req, res) => {
  try {
    const updateResult = await Client.findOneAndUpdate(
      { passportID: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send(updateResult);
  } catch (e) {
    res.status("404").send(e);
  }
};
//here we also need to delete all the accountss that are related to this client.
const deleteByPassportId = async (req, res) => {
  try {
    const session = await BankAccount.startSession();
    session.startTransaction();
    const numberOfAccounts = (
      await BankAccount.find({
        belongsToPassportId: req.params.id,
      })
    ).length;
    const accountDeleteResult = await BankAccount.deleteMany({
      belongsToPassportId: req.params.id,
    });

    assert.strictEqual(
      numberOfAccounts,
      accountDeleteResult.deletedCount,
      "something went wrong. canceling delete request, please try again with other request parameters"
    );
    console.log("result: ", accountDeleteResult);
    const deleteResult = await Client.deleteOne({ passportID: req.params.id });
    console.log("delete one client result: ", deleteResult);
    assert.strictEqual(
      deleteResult.deletedCount,
      1,
      "client doesn't exist, or wrong request parameters. couldn't delete!"
    );
    await session.commitTransaction();
    session.endSession();
    res
      .status("200")
      .send(`successfuly deleted ${deleteResult.deletedCount} client(s)`);
  } catch (e) {
    console.log(e);
    res.status("400").send(e);
  }
};

module.exports = {
  create,
  getAll,
  getByPassportId,
  getById,
  updateByPassportId,
  deleteByPassportId,
};
