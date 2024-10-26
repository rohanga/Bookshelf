const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const router = express.Router();

const JWT_SECRET = 'your_jwt_secret';

// Signup route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userId=generateRandomString(8)
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword ,userId:userId});
    await user.save();
    res.status(201).send({ message: 'User created successfully' , status:200,userId:userId});
  } catch (error) {
    res.status(500).send({ message: 'Error creating user',status:500 });
  }
});
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
}

// Example usage:
const randomString = generateRandomString(8);
console.log(randomString);
// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ message: 'Invalid credentials' });
    console.log(user)
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(200).send({ token:token ,userId:user.userId});
  } catch (error) {
    res.status(500).send({ message: 'Error logging in' });
  }
});

module.exports = router;
