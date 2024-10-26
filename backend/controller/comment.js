const User = require('../model/user');
const Comment = require('../model/comment');
const Book = require('../model/book');




exports.addCommnt = async (req, res,io) => {
    const { bookId } = req.params;
  const { userId, content } = req.body;


  try {
    const book = await Book.findOne({bookId:bookId});
    const user = await User.findOne({userId:userId});



    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const newComment = new Comment({ bookId: bookId, userId:userId,email:user.email, content });
    await newComment.save();

    await book.save();

    // Emit the new comment to connected clients
    io.emit('newComment', { bookId, user, comment: newComment });

    res.status(201).json(newComment);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error adding comment' });
  }
}
exports.posts = async (req, res) => {
    const { userId, bookId } = req.body;

    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const friendsPosts = await Post.find({ author: { $in: user.friends } });
        res.json(friendsPosts);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
