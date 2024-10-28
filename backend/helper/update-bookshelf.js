const Book = require('../schema/book');

exports.worker = async function (id,data, callback) {
 
  let err = {
    status: 200,
    message: ""
  }
  try {
    console.log("##########################",id)
    console.log("#$$$$$$$$$$$$$$$$$$$$$$$",data)
    const updatedBook = await Book.findByIdAndUpdate(id, data, {
      new: true
    });   return callback(err, updatedBook);

  } catch (e) {
    console.log(e)
    err.status = 500;
    err.message = "Internal server error";
    callback(err, null);
  }
};
