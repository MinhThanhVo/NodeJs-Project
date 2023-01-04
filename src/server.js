import express from "express";
import configViewEngine from "./config/ViewEngine";
import initWebRoute from "./route/web";
import connection from "./config/connectDB";
import initApiRoute from "./route/api";
require("dotenv").config();
var morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//setup view engine
configViewEngine(app);
//init web route
initWebRoute(app);
// init API route
initApiRoute(app);

//handle 404 not found
app.use((req, res) => {
  return res.render("404.ejs");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
