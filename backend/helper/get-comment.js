const model = require('../model/bookshelf.model');
const jwt = require('jsonwebtoken');

exports.worker = async function (data, params,callback) {
  const { email, password } = data;

  try {
    let err={
        status:200,
        message:""
    }
    const { username } = params;
    const user = await model.findOne({ username },'User');
    if (!user) {
        err.status=404
        err.message='User not found'
        return callback(err, null);
       
    }
    return callback(err, user);
  } catch (e) {
    err.status = 500;
    err.message = "Internal server error";
    callback(err, null);
  }
};
