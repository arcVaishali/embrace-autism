const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Event = mongoose.model(Event, eventSchema);
module.exports = { Event };
