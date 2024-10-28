const User = require('../schema/user');

exports.worker = async function (data,callback) {
 
  let err={
    status:200,
    message:""
}
  try {
    const user = await User.findOne({ userId:data.userId })
   
   console.log("User==>",user)
//     console.log("Result before populate==>", result);

    if (user.currentlyReading.length!=0) {
      await user.populate('currentlyReading.book'); // Use execPopulate for Mongoose < 5.0
      console.log("Populated Result==>", user);
      return callback(err,user.currentlyReading);
    }
    // This should reference the 'Book' model correctly
    if (!user) {
        err.status=404
        err.message='User not found'
        return callback(err, null);
       
    }
    return callback(err, user.currentlyReading);
  } catch (e) {
    console.log(e)
    err.status = 500;
    err.message = "Internal server error";
    callback(err, null);
  }
};
