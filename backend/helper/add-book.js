const Book = require('../schema/book');

exports.worker = async function (data, callback) {
 
  let err = {
    status: 200,
    message: ""
  }
  try {

   console.log(data)
    const newBook = new Book(data);
    await newBook.save();
    console.log("newBook==>",newBook)

    return callback(err,newBook)

  } catch (e) {
    console.log(e)
    err.status = 500;
    err.message = "Internal server error";
    callback(err, null);
  }
};
