const express = require('express');

const Users = require('../users/usersModel.js');

const server = express();

server.use(express.json());

server.get('/users', (req, res) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/users', async (req, res) => {
  let user = req.body;

  if (!user.name) {
    return res.status(400).json({ message: 'Need a name' });
  }

  try {
    const user = await Users.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the user',
    });
  }
})

server.delete('/users/:id', async (req, res) => {
  try {
    const count = await Users.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The user has been nuked' });
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error removing the user',
    });
  }
});

module.exports = server;
