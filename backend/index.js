// Import necessary modules
const express = require("express");
const cors = require("cors");
const app = express();

// Set the base directory for global usage
global.__basedir = __dirname;

// Set CORS options to allow requests from any origin
var corsOptions = {
  origin: "*"
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Import the database models
const db = require("./app/models");

// Sync the database and log the status
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Define a simple route to test server status
app.get("/", (req, res) => {
  res.json({ message: "Welcome to User CRUD Operations" });
});

// Import and use user-related routes
require("./app/routes/user.routes")(app);

// Start the server and listen on port 5500
app.listen(5500, () => {
  console.log(`Server is running on port ${5500}.`);
});