const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send(__dirname, "/index.html");
});
app.get("/hehe", (req, res) => {
  res.send("<h2>VO MINH THANH</h2>");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
