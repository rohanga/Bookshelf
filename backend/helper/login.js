const model = require('../model/bookshelf.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';
const User = require('../schema/user');
exports.worker = async function (data, callback) {
  const { email, password } = data;
  let err = {
    status: 200,
    message: ""
  }
  try {
    const user = await model.findOne({ email }, User);

   
    if (!user) {
      err.status=404
      err.message='We can not find an account with given email'
      return callback(err, null);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch==>",isMatch)
    if (!isMatch) {
      err.status=400
      err.message='Invalid credentials'
      return callback(err, null);
    };
   
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    return callback(err, { token: token, userId: user.userId });

  } catch (e) {
    console.log(e)
    err.status = 500;
    err.message = "Internal server error";
    callback(err, null);
  }
};
