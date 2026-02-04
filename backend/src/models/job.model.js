const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    company: {
      type: String
    },
    location: {
      type: String
    },

    description: {
      type: String,
      required: true
    },

    extractedSkills: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Job", jobSchema);
