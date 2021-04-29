const express = require("express");
const clientRouter = new express.Router();
const {
  create,
  getAll,
  getByPassportId,
  getById,
  updateByPassportId,
  deleteByPassportId,
} = require("../controller/Client");

clientRouter.post("/", create);
clientRouter.get("/", getAll);
clientRouter.get("/:id", getById);
clientRouter.get("/byPassportId/:id", getByPassportId);
clientRouter.put("/byPassportId/:id", updateByPassportId);
clientRouter.delete("/byPassportId/:id", deleteByPassportId);
module.exports = clientRouter;
