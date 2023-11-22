const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8800;

app.use(cors());
app.use(express.json());

const url = process.env.MONGO_URI;
global.URL = url;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection successfully");
});

const auth = require("./routes/auth.js");
app.use("/api/auth", auth);
const user = require("./routes/user.js");
app.use("/api/user", user);


// app.use((err, req, res, next) => {
//   const errorStatus = err.status || 500;
//   const errorMessage = err.message || "Something went wrong!";
//   return res.status(errorStatus).json({
//     success: false,
//     status: errorStatus,
//     message: errorMessage,
//     stack: err.stack,
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;