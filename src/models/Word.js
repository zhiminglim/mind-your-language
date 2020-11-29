const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true
  },
  language: {
    type: String
  },
  senseDefinition: [
    {
    type: String
    }
  ],
  subsenseDefinition: {
    type: String
  },
  lexicalCategoryId: {
    type: String
  },
  etymology: {
    type: String
  },
  example: {
    type: String
  }
})

module.exports = mongoose.model("Word", wordSchema);
