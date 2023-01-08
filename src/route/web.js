import express from "express";
import getHomeController from "../controller/homeController";
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");
let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.filename + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed !";
    return cb(new Error("Only image files are allowed!", false));
  }
  cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });
let uploadMultipleFiles = multer({
  storage: storage,
  fileFilter: imageFilter,
}).array("multiple_images", 5);
const initWebRoute = (app) => {
  router.get("/", getHomeController.getHomepage);
  router.get("/detail/user/:id", getHomeController.getDetailPage);
  router.post("/create-new-user", getHomeController.getCreateNewUser);
  router.post("/delete-user", getHomeController.deleteUser);
  router.get("/edit-user/:id", getHomeController.getEditPage);
  router.post("/update-user", getHomeController.postUpdateUser);
  router.get("/upload", getHomeController.getUploadFile);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    getHomeController.handleUploadFile
  );
  router.post(
    "/upload-multiple_images",
    (req, res, next) => {
      uploadMultipleFiles(req, res, (err) => {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
          res.send("LIMIT_UNEXPECTED_FILE");
        } else if (err) {
          res.send(err);
        } else {
          next();
        }
      });
    },
    getHomeController.handleUploadMultipleFiles
  );
  return app.use("/", router);
};
module.exports = initWebRoute;
