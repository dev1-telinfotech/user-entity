const db = require("../models");
const User = db.user;

// Retrieve all users
exports.getAllUsers = (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] } // Exclude sensitive attributes
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Some error occurred while retrieving users.'
      });
    });
};

// Retrieve single user
exports.fetchUserDetail = (req, res) => {
  const id = req.params.id;
  User.findOne({
    where: { id: id },
    attributes: { exclude: ['password'] } // Exclude sensitive attributes
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "User does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error in fetching user detail."
      });
    });
};

// Add a new user
exports.addUser = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Email and password cannot be empty!"
    });
    return;
  }

  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob
  })
    .then(user => {
      res.status(201).send({
        user: user,
        message: "User created successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
      });
    });
};

// Delete a user
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Could not delete User with id=" + id
      });
    });
};

// Update a user
exports.updateUser = (req, res) => {
  const id = req.params.id;

  const userObj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    dob: req.body.dob,
  };

  User.update(userObj, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating the user."
      });
    });
};
