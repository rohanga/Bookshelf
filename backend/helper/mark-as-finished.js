const User = require('../schema/user');

exports.worker = async function (data, callback) {

  let err = {
    status: 200,
    message: ""
  }

  try {
    console.log(data)
    const user = await User.findOne({ userId: data.userId })
    // Remove the book from currently reading list
    user.currentlyReading = user.currentlyReading.filter(
      (item) => item.book._id.toString() !== data.bookId
    );

    await user.save();


    return callback(err, user.currentlyReading);



  } catch (e) {
    console.log(e)
    err.status = 500;
    err.message = "Internal server error";
    callback(err, null);
  }
}; 
