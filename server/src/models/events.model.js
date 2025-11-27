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
      // required: true,
    },
    about: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    views: {
      type: Number,
      default: 0,
    },
    eventDate: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);


eventSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  if (this.isModified("eventDate") && this.eventDate instanceof Date) {
    this.eventDate = this.eventDate.getTime();
  }
  next();
});

eventSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  // Clean up related data, e.g., remove event from users' registered lists
  // You can require User model here if needed
  // Example: await User.updateMany({}, { $pull: { eventsRegistered: this._id } });
  next();
});

eventSchema.pre("findOneAndDelete", async function (next) {
  // Clean up related data for findOneAndDelete
  // Example: await ...
  next();
});

// Post Hooks
eventSchema.post("save", function (doc) {
  // Example: send notification or log
  // console.log(`Event created/updated: ${doc._id}`);
});

eventSchema.post("deleteOne", { document: true, query: false }, function (doc) {
  // Example: log deletion
  // console.log(`Event deleted: ${doc._id}`);
});

// Instance Methods
eventSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

eventSchema.methods.isOwner = function (userId) {
  return this.owner && this.owner.toString() === userId.toString();
};

eventSchema.methods.formatDate = function () {
  const date = new Date(this.eventDate);
  return date.toLocaleDateString();
};

// Static Methods
eventSchema.statics.findByOwner = function (ownerId) {
  return this.find({ owner: ownerId });
};

eventSchema.statics.upcomingEvents = function () {
  const now = Date.now();
  return this.find({ eventDate: { $gt: now } });
};

const Event = mongoose.model("Event", eventSchema);
module.exports = { Event };
