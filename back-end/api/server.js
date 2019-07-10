
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');



const scoresRouter=require('../ClassPoints/points-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/scores', scoresRouter);

// sanity check route
server.get('/', (req, res) => {
    res.status(200).json({ hello: 'World!' });
  });

  module.exports = server;