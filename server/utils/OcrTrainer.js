const path = require("path");
const fs = require("fs");
const dataFileBuffer = fs.readFileSync(__dirname + "/train-images-idx3-ubyte");
const labelFileBuffer = fs.readFileSync(__dirname + "/train-labels-idx1-ubyte");
const pixelValues = [];

// It would be nice with a checker instead of a hard coded 60000 limit here
for (var image = 0; image <= 59999; image++) {
  var pixels = [];

  for (var x = 0; x <= 27; x++) {
    for (var y = 0; y <= 27; y++) {
      pixels.push(dataFileBuffer[image * 28 * 28 + (x + y * 28) + 15]);
    }
  }

  var imageData = {};
  imageData[JSON.stringify(labelFileBuffer[image + 8])] = pixels;

  pixelValues.push(imageData);
}
fs.writeFileSync("/trainImages", dataFileBuffer);
fs.writeFileSync("/trainLabels", labelFileBuffer);
