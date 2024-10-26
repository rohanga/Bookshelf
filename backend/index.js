const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = 5000;
const server = http.createServer(app);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Update this to your frontend origin
    methods: ["GET", "POST"],
  }
});

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/bookshelf', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Import routes
const commentRoutes = require('./routes/comment')(io); // Pass `io` to routes
app.use('/comment', commentRoutes);

const bookRoutes = require('./routes/book');
app.use('/books', bookRoutes);

const userRoutes = require('./routes/users');
app.use('/api', userRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Log whenever the client emits a 'newComment' event
  socket.on('newComment', (data) => {
    console.log('Received newComment from frontend:', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
