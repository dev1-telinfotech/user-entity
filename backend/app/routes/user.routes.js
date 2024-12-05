
module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all users
    router.get("/", users.getAllUsers);
  
    // Retrieve a single user by ID
    router.get("/:id", users.fetchUserDetail);
  
    // Create a new user
    router.post("/", users.addUser);
  
    // Update a user by ID
    router.put("/:id", users.updateUser);
  
    // Delete a user by ID
    router.delete("/:id", users.deleteUser);
  
    // Add the router to the app
    app.use('/api/user', router);
  };
  