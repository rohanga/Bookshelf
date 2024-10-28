const signUpController = require("./controller/signup.controller")
const loginController = require("./controller/login.controller")
const getCommentController = require("./controller/get-comment.controller")
const postCommentController = require("./controller/post-comment.controller")
const getBookshelfController = require("./controller/get-bookshelf.controller")
const updateBookshelfController = require("./controller/update-bookshelf.controller")
const deleteBookshelfController = require("./controller/delete-bookshelf.controller")
const currentlyReadingController = require("./controller/get-currently-reading.controller")
const getBookController = require("./controller/get-book.controller")
const markAsCurrentlyReadingBookController = require("./controller/mark-currently-reading.controller")
const currentlyReadingProgressController = require("./controller/update-reading-progress.controller")
const markAsFinishedController = require("./controller/mark-as-finished.controller")
const addBookController = require("./controller/add-book.controller")
exports.routesConfig = (app,io) => {
    app.post("/signup",
        signUpController.signUp
    )
    app.post("/login",
        loginController.login
    )
    app.get('/posts/:username', getCommentController.getComment);
    app.post('/comment/:bookId/comments', (req, res) => {
        postCommentController.addCommnt(req, res, io);  // Pass the io instance to the controller function
      });
    // app.post('/:bookId/comments', postCommentController.addCommnt)
    app.post("/books/add",
        addBookController.book
    )
    app.get("/books/:userId",
        getBookshelfController.book
    )

    app.put("/books/update/:id",
        updateBookshelfController.book
    )

    app.delete("/books/delete/:id",
        deleteBookshelfController.book
    )


    // Get currently reading booksa
    app.get('/books/currentlyreading/:userId', currentlyReadingController.currentlyReading);
    app.get('/books/getbook/:bookId', getBookController.getBook)
    // // Mark a book as currently reading
    app.post('/books/markcurrentlyreading', markAsCurrentlyReadingBookController.markAsCurrentlyReading);

    // // Update reading progress
    app.post('/books/update-progress', currentlyReadingProgressController.currentlyReadingProgress);

    // // Mark a book as finished
    app.post('/books/mark-as-finished', markAsFinishedController.markAsFinished);

}