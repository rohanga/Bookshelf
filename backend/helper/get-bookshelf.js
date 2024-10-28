const Book = require('../schema/book');

exports.worker = async function (data, callback) {
 
  let err = {
    status: 200,
    message: ""
  }
  try {
    console.log("FInd Bookdata====>",data)
    const books = await Book.find(data);
    console.log("FInd Book====>",books)
    console.log("FInd Book data====>",books)

    if(!books){
      return callback (err,null)
    }
    return callback(err, books);

  } catch (e) {
    console.log(e)
    err.status = 500;
    err.message = "Internal server error";
    callback(err, null);
  }
};
