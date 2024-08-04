const express = require("express");
const mongoose = require("mongoose");
const Item = require("./models/Item");
const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));


mongoose
  .connect("mongodb://user:pass@51.77.210.239:27017/mydb", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error = ",err));


const calculate = require('./calculate')


app.get("/items", (req, res) => {
  Item.find()
    .then((items) => res.send({ items }))
    .catch((err) => res.status(500).json({ err }));
});

app.post("/items/add", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem
    .save()
    .then((item) => res.send({ message: "item saved successfully", item }))
    .catch((err) => res.status(500).json({ err }));
});


app.get("/", (req, res) => {
  res.send("Hello Devops - session 2 pro test");
});

app.post("/cal", (req, res) => {
  const { a, b } = req.body
  res.send({ "cal": calculate.cal(a, b) });
});


// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    // Perform a simple database operation to check database health.
    await mongoose.connection.db.admin().ping();
    res.status(200).json({
      status: "UP",
      message: "App is running smoothly...",
      database: "Connected",
    });
  } catch (err) {
    res.status(500).json({
      status: "DOWN",
      message: "App or Database is experiencing issues...",
      database: "Disconnected",
    });
  }
});


const port = 3000;

app.listen(port, () => console.log("Server running on port 3000"));