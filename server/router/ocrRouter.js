const express = require("express");
const ocrRouter = new express.Router();
const { create, deleteAll } = require("../controller/Ocr");

ocrRouter.post("/", create);
ocrRouter.delete("/", deleteAll);
module.exports = ocrRouter;
