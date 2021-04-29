// const fs = require("fs");
// const { createWorker } = require("tesseract.js");
// const worker = createWorker({
//   logger: (m) => console.log(m),
// });
// export async function recognize(image) {
//   await worker.load();
//   await worker.loadLanguage("eng");
//   await worker.initialize("eng");
//   const {
//     data: { text },
//   } = await worker.recognize(image);
//   await worker.terminate();
//   return text;
// }
