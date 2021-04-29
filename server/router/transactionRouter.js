const express = require("express");
const transactionRouter = new express.Router();
const {
  create,
  getAll,
  getAllByPassportId,
  getAllInRange,
  getById,
} = require("../controller/Transaction");

transactionRouter.post("/", create);
transactionRouter.get("/", getAll);
transactionRouter.get("/range", getAllInRange);
transactionRouter.get("/byPassportId/:id", getAllByPassportId);
transactionRouter.get("/:id", getById);

module.exports = transactionRouter;
