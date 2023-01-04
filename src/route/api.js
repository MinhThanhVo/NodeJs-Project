import express from "express";
import APIController from "../controller/APIController";

let router = express.Router();
const initApiRoute = (app) => {
  router.get("/users", APIController.getAllUsers); //method GET --> read data
  router.post("/create-user", APIController.createNewUser); //method POST --> create data
  router.put("/update-user", APIController.updateUser); //method PUT --> update data
  router.delete("/deleta-user/:id", APIController.deleteUser); //metho DELETE --> delete user
  return app.use("/api/v1/", router);
};
module.exports = initApiRoute;
