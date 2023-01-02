import express from "express";
import getHomeController from "../controller/homeController";
let router = express.Router();
const initWebRoute = (app) => {
  router.get("/", getHomeController.getHomepage);
  router.get("/detail/user/:userID", getHomeController.getDetailPage);
  router.get("/my", (req, res) => {
    res.send("Hello world!!!");
  });
  return app.use("/", router);
};
module.exports = initWebRoute;
