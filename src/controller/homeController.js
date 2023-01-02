import connection from "../config/connectDB";
let getHomepage = (req, res) => {
  // logic MVC
  let data = [];
  connection.query("SELECT * FROM `users`", function (err, results, fields) {
    // console.log("Connection suess!!!");
    // console.log(results);
    results.map((row) => {
      //return row;
      data.push({
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.Email,
        address: row.Address,
      });
    });
    console.log(">>> check data ", data);
    return res.render("index.ejs", { dataUser: JSON.stringify(data) });
    // console.log(rows);
  });
};
module.exports = {
  getHomepage,
};
