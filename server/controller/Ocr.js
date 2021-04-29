const Ocr = require("../model/OCR");

const { createWorker } = require("tesseract.js");

async function recognize(image) {
  const worker = createWorker({
    logger: (m) => console.log(m),
  });
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(image);
  await worker.terminate();
  return text;
}

const create = async (req, res) => {
  try {
    console.log(req.body);
    const text = await recognize(req.body.base64Image);
    const keyProp = req.body.keyProp;
    let ocr = new Ocr({ keyProp: keyProp, base64Image: text });
    await ocr.save();
    res.status(201).send(ocr);
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e);
  }
};

const deleteAll = async (req, res) => {
  try {
    const result = await Ocr.deleteMany({});
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e.message);
  }
};
module.exports = {
  create,
  deleteAll,
};
