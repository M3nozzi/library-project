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
    .find({}, null, {
      sort: {
        title:1
      }
    })


    .then(books => {
      
      // console.log(booksFromMongoDB);

      res.render('books', {
        books
      });
    }) // closing .then

    .catch(error => console.log(error));
});

//route details route

router.get('/books/:bookId',(req, res, next) => {
  const {
    bookId
  } = req.params;
  Book
    .findById(bookId)

    .then(theBook => {

      res.render('book-details', { book: theBook });
    
    }) // closing .then

    .catch(error => console.log(error));

});

//book create routes
//GET form

router.get('/book-add', (req, res, next) => {
  
  res.render("book-add");

})

//POST add book

router.post('/book-add', (req, res, next) => {
  console.log('body: ', req.body);
  
  const {
    title,
    author,
    description,
    rating
  } = req.body;

  //using new keyword by instance

  // const newBook = new Book({
  //   title,
  //   author,
  //   description,
  //   rating
  // });
  
  // newBook.save()
  //   .then((book) => {
  //     console.log(book);
  //     res.redirect('/books');
  // })
  // .catch(error => console.log(error));

//using create method of Model

  Book.create({
    title,
    author,
    description,
    rating
  })
  .then(response => {
        console.log(response);
        res.redirect('/books');
    })
    .catch(error => console.log(error));

});

//book edit
//GET form

router.get('/book-edit/:bookId', (req, res, next) => {
  const {
    bookId
  } = req.params;

  Book
    .findById(bookId)
    .then(book => {
      // console.log(book);
      res.render('book-edit',book)   
  })
  .catch(error => console.log(error));
});

//POST edit
router.post('/book-edit', (req, res) => {
  const {
    title,
    author,
    description,
    rating
  } = req.body;

  const {
    bookId
  } = req.query;

  Book.findByIdAndUpdate(bookId, {
    $set: {
      title,
      author,
      description,
      rating
    }, 
  },{
    new: true
  })
    .then(response => {
      console.log(response);
      res.redirect(`/book/${bookId}`);
      
      })
    .catch(error => console.log(error));
  
});

//implement the delete route and
//redirect to /books

router.post('/book-delete/:bookId', (req, res) => {

  const {
    bookId
  } = req.params;

  Book.findByIdAndRemove(bookId)
    .then(response => {
      console.log(response);
      res.redirect('/books');
      })
    .catch(error => console.log(error));
  
});



module.exports = router;
