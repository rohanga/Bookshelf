const Book = require('../schema/book');

exports.worker = async function (id, callback) {

  let err = {
    status: 200,
    message: ""
  }
  try {
    console.log("delete book data+++++++++++++++++++++++>",id)
    const deletebook = await Book.findByIdAndDelete(id);
    console.log(deletebook)
    return callback(err, "Book removed");

  } catch (e) {
    console.log(e)
    err.status = 500;
    err.message = "Internal server error";
    callback(err, null);
  }
};
