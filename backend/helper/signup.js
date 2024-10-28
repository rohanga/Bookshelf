const model = require('../model/bookshelf.model');
const bcrypt = require('bcrypt');
const User = require('../schema/user');
exports.worker = async function (data, callback) {
  const { email, password } = data;
  let err={
    status:200,
    message:""
  }
  try {
    const user = await model.findOne({ email }, User);
    if (user) {
      err.status=409
      err.message='User Already Exist'
      return callback(err, null);
    }

    const userId = generateRandomString(8)
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new User({ email, password: hashedPassword ,userId:userId});
 

    let res = await newuser.save()
    
    let data = {}
    if (res) {
      data = { message: 'User created successfully', userId: userId };
      return callback(err, data);
    }
    err.status=500
    err.message="issue while inserting data"
    return callback(err, null);
  } catch (e) {
    console.log(e)
    err.status = 500;
    err.message = "Internal server error";
    callback(err, null);
  }
};
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

