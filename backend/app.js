const express = require("express");
const http = require('http');
const dbConnect = require('./connection'); // Adjust the path as needed
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const router = require("./router_config");

const app = express();
const port = process.env.PORT || 5000;
const frontendport = 3000

const server = http.createServer(app);

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Create a new Socket.IO server instance
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${frontendport}`, // Update this to your frontend origin
    methods: ["GET", "POST"],
  }
});

// Database connection and server setup
dbConnect().then(() => {
  // Configure your routes
  router.routesConfig(app, io);

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
  server.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}).catch(err => {
  console.error('Database connection failed:', err);
});
