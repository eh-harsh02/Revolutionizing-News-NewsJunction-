const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000; // Change this port number if needed

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/newsletter", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoDB schema for subscribers
const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true },
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// Route to handle POST requests from subscribe.html
app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res.status(201).json({ message: "Subscriber added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
