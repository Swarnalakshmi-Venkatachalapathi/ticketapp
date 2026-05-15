const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Node is running under IIS ✔");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started");
});