import express from "express";
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen("5001", () => console.log("listening at port 5001..."));
