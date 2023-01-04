import express from "express";
import configViewEngine from "./config/ViewEngine";
import initWebRoute from "./route/web";
import connection from "./config/connectDB";
import initApiRoute from "./route/api";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//setup view engine
configViewEngine(app);
//init web route
initWebRoute(app);
// init API route
initApiRoute(app);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
