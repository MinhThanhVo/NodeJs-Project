// get the client
//const mysql = require("mysql2")
import mysql from "mysql2/promise";
//create the connection to database
console.log("Creating connecting pool...");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "information_nodejs",
});
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "information_nodejs",
// });
//const connection = await mysql.createConnection({host: "localhost", user:"root", database:""})
//query
// connection.query("SELECT * FROM `users`", function (err, results, fields) {
//   console.log("Connection suess!!!");
//   console.log(results);
//   let rows = results.map((row) => {
//     return row;
//   });
//   console.log(rows);
// });
export default pool;
