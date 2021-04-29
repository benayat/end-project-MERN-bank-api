const express = require("express");
const bankAccountRouter = new express.Router();
const bankAccount = require("../model/Client");
const {
  create,
  getAll,
  getAllActive,
  getAllInRange,
  getById,
  getByPassportId,
  updateById,
  deleteById,
} = require("../controller/BankAccount");

bankAccountRouter.post("/", create);
bankAccountRouter.get("/", getAll);
bankAccountRouter.get("/active", getAllActive);
bankAccountRouter.get("/range", getAllInRange);
bankAccountRouter.get("/:id", getById);
bankAccountRouter.get("/byPassportId/:id", getByPassportId);
bankAccountRouter.put("/:id", updateById);
bankAccountRouter.delete("/:id", deleteById);
module.exports = bankAccountRouter;
