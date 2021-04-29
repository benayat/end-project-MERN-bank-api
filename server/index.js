const express = require("express");
const router = require("./router/indexRouter");
const cors = require("cors");
const path = require("path");
const app = express();
require("./db/mongoose");
app.use(cors());
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
} else {
  app.use(express.static(path.join(__dirname, "../client/public")));
}
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is up on 5000");
});
