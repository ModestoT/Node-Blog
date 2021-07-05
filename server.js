const express = require('express'); 
const helmet = require('helmet');
const cors = require('cors');

const postRouter = require('./posts/posts-router.js');
const userRouter = require('./users/users-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

module.exports = server;