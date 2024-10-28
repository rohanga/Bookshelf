const Book = require('../schema/book');
const Comment = require('../schema/comment');
const User = require('../schema/user');

exports.worker = async function (data, callback) {
 
  let err = {
    status: 200,
    message: ""
  }
  const { bookId } = data;

    try {
      const book = await Book.findOne({bookId:bookId})
      const comment = await Comment.find({bookId:bookId})
        console.log("book====>",book.userId)

        const user = await User.findOne({userId:book.userId})
        console.log("user====>",user)
        
        if (!book) {
          err.status=404
          err.message="Book not found"
          return callback(err,null);
        }
        let bookdata={
            book:book,
            comment:comment,
            user:user
        }
        return callback(err,bookdata);
 

  } catch (e) {
    console.log(e)
    err.status = 500;
    err.message = "Internal server error";
    callback(err, null);
  }
};
