const dbConnect = require("../connection")



exports.insertData = async (data, collection) => {
  console.log("pass3.0", data)
  // let mongomodel = await dbConnect(collection);
  let result = await collection.save()
  console.log("Result==>", result)
  if (result.acknowledged) {
    return "success"
  }
}

exports.findOne = async (data, collection) => {
  console.log("pass3.0", data)
  // let mongomodel = await dbConnect(collection);
  // let result = await User.findOne(data).populate('currentlyReading.book');

  let result = await collection.findOne(data)
  console.log("Result==>", result)
  if (result && result.email) {
    return result
  }
}

exports.find = async (data, collection) => {
  console.log("pass3.0", data)
  let mongomodel = await dbConnect(collection);
  let result = await mongomodel.find(data)
  console.log("Result==>", result)
  if (result) {
    return result
  }
}


exports.findByIdAndUpdate = async (id, data, collection) => {
  console.log("pass3.0", data)
  let mongomodel = await dbConnect(collection);
  let result = await mongomodel.findByIdAndUpdate(id, data, {
    new: true
  });
  console.log("Result==>", result)  
  if (result) {
    return result
  }
}


exports.findByIdAndDelete = async (id, collection) => {
 
  let mongomodel = await dbConnect(collection);
  let result = await mongomodel.findByIdAndDelete(id)
  console.log("Result==>", result)
  if (result) {
    return result
  }
}
// exports.findOneAndPopulate=async(data,collection)=>{
  
// console.log("data==>",data)
//   let mongomodel = await dbConnect(collection);
//     let result = await mongomodel.findOne(data);
//     console.log("Result before populate==>", result);

//     if (result) {
//       await result.populate('currentlyReading.book').execPopulate(); // Use execPopulate for Mongoose < 5.0
//       console.log("Populated Result==>", result);
//       return result;
//     }
//     return null; // Explicit return for clarity
// }
// controllers/book.controller.js
const User = require('../schema/user');

exports.findOneAndPopulate = async (data) => {
  try {
    let result = await User.findOne(data).populate('currentlyReading.book');
    console.log("Populated Result==>", result);
    return result;
  } catch (error) {
    console.error("Error in findOneAndPopulate:", error);
    throw error; // Rethrow for handling upstream
  }
};


exports.upsertUser=async(filter,data,collection)=> {
  let mongomodel = await dbConnect(collection);
  // Replace with your identifier
  const update = { $set: data }; // Update the fields in the document
  const options = { upsert: true }; // Create a new document if no match is found

  const result = await mongomodel.updateOne(filter, update, options);
  return result;
}