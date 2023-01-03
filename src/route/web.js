import express from "express";
import getHomeController from "../controller/homeController";
let router = express.Router();
const initWebRoute = (app) => {
  router.get("/", getHomeController.getHomepage);
  router.get("/detail/user/:id", getHomeController.getDetailPage);
  router.post("/create-new-user", getHomeController.getCreateNewUser);
  router.post("/delete-user", getHomeController.deleteUser);
  router.get("/edit-user/:id", getHomeController.getEditPage);
  router.post("/update-user", getHomeController.postUpdateUser);
  router.get("/my", (req, res) => {
    res.send("Hello world!!!");
  });
  return app.use("/", router);
};
module.exports = initWebRoute;
