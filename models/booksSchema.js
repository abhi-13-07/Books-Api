const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const booksSchema = new Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  edition: {
    type: String, 
  },
  published_on: {
    type: Date,
    default: Date.now,
  }
});

module.exports = model("Books", booksSchema);