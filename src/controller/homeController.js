import pool from "../config/connectDB";
import multer from "multer";

let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.render("index.ejs", { dataUser: rows });
};
let getDetailPage = async (req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute("SELECT * FROM `users` WHERE `id` = ?", [
    userId,
  ]);
  return res.send(JSON.stringify(user));
};
let getCreateNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "INSERT INTO users(`firstName`, `lastName`, `email`, `address`) VALUES (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};
let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("DELETE FROM users where id = ? ", [userId]);
  return res.redirect("/");
};
let getEditPage = async (req, res) => {
  let id = req.params.id;
  let [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
  return res.render("update.ejs", { dataUser: user[0] }); //x <= y
};
let postUpdateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    "UPDATE users SET firstName = ? ,lastName = ?, Email = ?, Address = ? WHERE id = ?",
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};

let getUploadFile = async (req, res) => {
  return res.render("uploadFile.ejs");
};
//const upload = multer().single("profile_pic");
let handleUploadFile = async (req, res) => {
  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send("Loi_1", req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload!");
    } else if (err instanceof multer.MulterError) {
      return res.send("Loi_2", err);
    } else if (err) {
      return res.send("Loi_3", err);
    }
    res.send(
      `You have upload this image: <hr><img src = "/image/${req.file.filename}" width= "500px"><hr/><a href = "/upload">Upload another image</a>`
    );
  });
};
module.exports = {
  getHomepage,
  getDetailPage,
  getCreateNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
  getUploadFile,
  handleUploadFile,
};
