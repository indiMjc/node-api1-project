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
      res.status(500).json({ error: "The users could not be retrieved", err });
    });
});

// GET /api/users/:id to return user by id
server.get("/api/users/:id", (req, res) => {
  usersDb
    .findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Specified user does not exist" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "User information could not be retrieved", err });
    });
});

// POST /api/users creates new user
server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (name && bio) {
    usersDb
      .insert({ name: name, bio: bio })
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "Error while saving user to database", err });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide a name and bio for the new user" });
  }
});

// PUT /api/users/:id edits user by id
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const { name, bio } = req.body;

  if (name && bio) {
    usersDb
      .findById(id)
      .then(user => {
        if (user) {
          usersDb
            .update(id, { name: name, bio: bio })
            .then(() => {
              res.status(200).json({ ...user, name: name, bio: bio });
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: "User could not be modified", err });
            });
        } else {
          res
            .status(404)
            .json({ message: "User with specified ID does not exist" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "User could not be modified", err });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide a name and bio for the new user" });
  }
});

// DELETE /api/users/:id deletes user from db by id
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  usersDb
    .findById(id)
    .then(user => {
      if (user) {
        usersDb
          .remove(id)
          .then(() => {
            res.status(200).json(user);
          })
          .catch(err => {
            res.status(500).json({ error: "User could not be removed", err });
          });
      } else {
        res
          .status(404)
          .json({ message: "User with specified ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "User could not be removed", err });
    });
});

// set server to listen to port declared above with a message letting me know it's working
server.listen(port, () => {
  console.log(`\n***API up and running on port ${port}***\n`);
});
