import pool from "../config/connectDB";
let getAllUsers = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.status(200).json({
    message: "Sucess!!!",
    data: rows,
  });
};
let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: "missing required params!",
    });
  }
  await pool.execute(
    "INSERT INTO users(`firstName`, `lastName`, `email`, `address`) VALUES (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );
  return res.status(200).json({
    message: "Add user sucess!!!",
  });
};
let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  if (!firstName || !lastName || !email || !address || !id) {
    return res.status(200).json({
      message: "missing required params!",
    });
  }
  await pool.execute(
    "UPDATE users SET firstName = ? ,lastName = ?, Email = ?, Address = ? WHERE id = ?",
    [firstName, lastName, email, address, id]
  );
  return res.status(200).json({
    message: "Update sucess !",
  });
};
let deleteUser = async (req, res) => {
  let userId = req.params.id;
  if (!userId) {
    return res.status(200).json({
      message: "missing required params!",
    });
  }
  await pool.execute("DELETE FROM users where id = ? ", [userId]);
  return res.status(200).json({
    message: "Delete sucess !",
  });
};
module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
