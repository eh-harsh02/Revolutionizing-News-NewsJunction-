const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/newsData")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("error");
  });

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const collection = new mongoose.model("data", dataSchema);

data = [
  {
    name: "aman",
  },
];
collection.insertMany([data]);
