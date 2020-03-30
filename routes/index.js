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

//route bookID

router.get('/books/:bookId',(req, res, next) => {
  
  Book
    .findById(req.params.bookId)

    .then(theBook => {

      res.render('book-details', { book: theBook });
    
    }) // closing .then

    .catch(error => console.log(error));

  // console.log('The ID from the URL is: ', bookId)
  // res.render('bookInformation')
});
module.exports = router;
