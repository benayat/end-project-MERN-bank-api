const { Router } = require("express");
const clientRouter = require("./clientRouter");
const bankAccountRouter = require("./bankAccountRouter");
const transactionRouter = require("./transactionRouter");
const ocrRouter = require("./ocrRouter");
const router = new Router();

router.use("/api/clients", clientRouter);
router.use("/api/bankaccounts", bankAccountRouter);
router.use("/api/transactions", transactionRouter);
router.use("/api/ocr", ocrRouter);

module.exports = router;
