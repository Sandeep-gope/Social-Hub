Frontend:

Pages:
1. Home.jsx (contains components Navbar.jsx and PostCard.jsx)
-  It has like and comment icons, clicking on which it will display a comment section with previous comments.
-  The count for likes will increase on clicking the like icon

2. CreatePost.jsx
-  It is a different page apart from Home.jsx
-  It requires all the details as well as image which the user need to post
-  It has a button , clicking on which it will navigate to the home page with the new post

Backend:
1. Database - MongoDB
2. Dependencies - bcryptjs, cors, dotenv, express, jsonwebtoken, mongoose, multer

controllers:
1. Comment controller (lists all comments, verify for the post existence and adds a comment)
2. Post controller (Logic to create new post, handles like count)

db folder (contains file related to database connection)

models:
1. Comment model (for the contents in a comment and their type)
2. Post model (for the contents in a post and their type)

uploads folder has all the images of the posts

routes:
1. Contains five different endpoints
   GetAllPosts, createPost, likePost, commentPost, getCommentsByPostId