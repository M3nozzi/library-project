const express = require('express');
const router = express.Router();
const Book = require('../models/book')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//books
router.get('/books', (req, res, next) => {

  Book
    .find()
    .then(booksFromMongoDB => {
      
      // console.log(booksFromMongoDB);

      res.render('books', {
        books: booksFromMongoDB
      });
    }) // closing .then

    .catch(error => console.log(error));
});

module.exports = router;
