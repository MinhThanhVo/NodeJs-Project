import pool from "../config/connectDB";
let getHomepage = async (req, res) => {
  // logic MVC
  // let data = [];
  // connection.query("SELECT * FROM `users`", function (err, results, fields) {
  //   // console.log("Connection suess!!!");
  //   // console.log(results);
  //   results.map((row) => {
  //     //return row;
  //     data.push({
  //       id: row.id,
  //       firstName: row.firstName,
  //       lastName: row.lastName,
  //       email: row.Email,
  //       address: row.Address,
  //     });
  //   });
  //   //console.log(">>> check data ", data);
  //   //return res.render("index.ejs", { dataUser: data });
  //   // console.log(rows);
  // });
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.render("index.ejs", { dataUser: rows });
};
let getDetailPage = async (req, res) => {
  let userId = req.params.id;
  let [user] = await pool.execute("SELECT * FROM `users` WHERE `id` = ?", [
    userId,
  ]);

  // console.log(user);
  // console.log("Check res params:", req.params );
  return res.send(JSON.stringify(user));
};
let getCreateNewUser = async (req, res) => {
  //console.log("Check req:", req.body);
  let { firstName, lastName, email, address } = req.body;
  // let firstName = req.body.firsrName;
  // let lastName = req.body.lastName;
  // let email = req.body.email;
  // let address = req.body.address;
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
module.exports = {
  getHomepage,
  getDetailPage,
  getCreateNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
};
