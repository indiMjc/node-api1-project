// implement your API here
// get express module
const express = require("express");
// create server using express
const server = express();
// set server to use json parser
server.use(express.json());
// get db module from data folder
const usersDb = require("./data/db.js");
// set port number
const port = 4000;

// initial endpoint to test if working
server.get("/", (req, res) => {
  res.send({ message: "ayyy boooi :D" });
});

// GET /api/users to return array of users from db
server.get("/api/users", (req, res) => {
  usersDb
    .find()
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "There are no users in the database" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The users could not be retrieved" });
    });
});

// set server to listen to port declared above with a message letting me know it's working
server.listen(port, () => {
  console.log(`\n***API up and running on port ${port}***\n`);
});
