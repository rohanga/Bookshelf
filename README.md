
# Bookshelf

Bookshelf is a mini social network dedicated to book lovers, enabling readers to curate their favorite book titles, add ratings, reviews, and comments on reviews by friends. It aims to create an engaging platform for sharing and discovering books. For visual reference, you can refer to [Goodreads](https://www.goodreads.com).

## Features

### User Accounts
- Users can sign up and log in using their email IDs and passwords.
- Social login options are available as an added feature.

### My Bookshelf
- Users can search and add books using a third-party API such as Google Books or the NY Times Books API.
- Once added, users can see a table displaying:
  - Thumbnail cover image
  - Title
  - Author
  - Average rating (if available)
  - Rating meter for user ratings
  - Text review functionality with edit and remove capabilities

### Dashboard
- Upon login, users are directed to their dashboard, which features:
  - **Currently Reading**: Users can mark books as 'currently reading', update progress with a percentage value and a comment, and indicate when they've finished a book.
  - The finished book is removed from the 'Currently Reading' section and the My Bookshelf.

### Social Cards
- Users can post updates, reviews, and ratings visible on their dashboard for friends.
- Social cards display reviews and ratings for simplicity and easy access.

## Project Structure

The project is structured into two main folders: `frontend` and `backend`.

### Frontend
- Contains all CSS and React code.
- State management is implemented using Redux.
- at root level do `npm i` 
- To run the frontend project, navigate to the `frontend` directory and use:
  ```bash
  npm run start

### Backend
- node version use 20
- Contains all databases oprations.
- index.js is main file in backend folder.
- at root level do `npm i`
- you have to create mongo database `bookshelf`
- To run the backend project, navigate to the `backend` directory and use:
  ```bash
  node index.js
