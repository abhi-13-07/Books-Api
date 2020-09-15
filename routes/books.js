const router = require("express").Router();
const _ = require("lodash");

// importing books schema
const Book = require("../models/booksSchema");

router.route("/")
  .get(async (req, res) => {
    const books = await Book.find();
    res.status(200).json(books);
  })

  .post(async (req, res) => {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      edition: req.body.edition,
    });
    await newBook.save();
    res.status(200).json(newBook);
  });

// get documents by author name
router.get("/author/:authorName", async (req, res) => {
  try {
    const foundItems = await Book.find({author: _.startCase(req.params.authorName)});
    if (foundItems.length != 0) {
      res.status(200).json(foundItems);
    } else {
      res.status(404).json({message: `can't find anything on ${req.params.author}`});
    }
  } catch (err) {
    console.log(err);
  }
});

router.route("/:id")
  .get(async (req, res) => {
    try {
      const foundItem = await Book.findOne({_id: req.params.id});
      if (foundItem) {
        res.status(200).json(foundItem);
      } else {
        res.status(404).json({message: `can't find any document with id of ${req.params.id}`});
      }
    } catch(err) {
      console.log(err);
    }
  })
  .patch(async (req, res) => {
    try {
      const updatedItem = await Book.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json(updatedItem);
    } catch(err) {
      console.log(err);
    }
  })
  .delete(async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({message: `Successfully deleted document with id ${req.params.id}`});
    } catch(err) {
      res.status(404).json({message: err.message});
    }
  });

module.exports = router;