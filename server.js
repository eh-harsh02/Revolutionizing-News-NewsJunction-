const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/newsjunction_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Check MongoDB connection
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Create a Mongoose Schema for User
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Signup route
// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const newUser = new User({
      firstName: firstname,
      lastName: lastname,
      email,
      password,
    });

    await newUser.save();
    res.status(200).send("User saved successfully");
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send("Error saving user");
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("Login successful");
    // You can add additional logic here, like setting a session or JWT token
  } catch (err) {
    console.error("Error finding user:", err);
    res.status(500).send("Error finding user");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
