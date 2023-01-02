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
  let [user] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [userId]);
  // console.log(user);
  // console.log("Check res params:", req.params );
  return res.send(JSON.stringify(user));
};
module.exports = {
  getHomepage,
  getDetailPage,
};
