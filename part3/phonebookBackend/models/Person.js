require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB", result);
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Name must be at least 3 characters long."],
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Updated regex to match the required phone number format
        return /^(0[0-9]{1,2}-[0-9]{6,8})$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! It must be in the format 0X-XXXXXXX.`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
