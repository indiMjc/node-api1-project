// implement your API here

// get express module
const express = require("express");

// create server using express
const server = express();

// get db module from data folder
const db = require("./data/db.js");

// set port number
const port = 4000;

// set server to listen to port declared above with a message letting me know it's working
server.listen(port, () => {
  console.log(`\n***API up and running on port ${port}***\n`);
});
