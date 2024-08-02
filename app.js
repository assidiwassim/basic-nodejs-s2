const express = require("express");
const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const calculate = require('./calculate')


app.get("/", (req, res) => {
  res.send("Hello Devops - session 2 ");
});

app.post("/cal", (req, res) => {
  const { a, b } = req.body
  res.send({ "cal": calculate.cal(a, b) });
});

const port = 3000;

app.listen(port, () => console.log("Server running on port 3000"));