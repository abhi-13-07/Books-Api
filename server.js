require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, () => {
  console.log("connected to database..");
});

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/books", require("./routes/books"));

app.get("/", (req, res) => {
  res.status(404).json({error: "Not found!!"});
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));