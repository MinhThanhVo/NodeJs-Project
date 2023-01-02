// get the client
//const mysql = require("mysql2")
import mysql from "mysql2";
//create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "information_nodejs",
});

//query
connection.query("SELECT * FROM `users`", function (err, results, fields) {
  console.log("Connection suess!!!");
  console.log(results);
  let rows = results.map((row) => {
    return row;
  });
  console.log(rows);
});
export default connection;
