const Book = require('../schema/book');
const User = require('../schema/user');
const Comment = require('../schema/comment');


exports.worker = async function (data, params, io, callback) {
  let err = {
    status: 200,
    message: ""
  }
  const { bookId } = params;
  const { userId, content } = data;
  try {

    const book = await Book.findOne({bookId:bookId});
    const user = await User.findOne({userId:userId});

    let newComment = new Comment({ bookId: bookId, userId:userId,email:user.email, content });
    await newComment.save();

    await book.save();

    // Emit the new comment to connected clients
    io.emit('newComment', { bookId, user, comment: newComment });

    return callback(err,newComment)

  } catch (e) {
    err.status = 500;
    err.message = "Internal server error";
    callback(err, null);
  }
};
