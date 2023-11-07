const mongoose = require("mongoose");

const mongoConnection = (dbURI) => {
  mongoose
    .connect(dbURI)
    .then((res) => {
      console.log("🟢 DATABASE CONNECTED");
    })
    .catch((err) => console.log("🔴 DATABASE ERROR :", err));
};

module.exports = mongoConnection;
