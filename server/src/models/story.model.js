const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      required: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    views: {
      type: Number,
      default: 0,
    },
    // postedOn:{
    //     type:Number
    // },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);


storySchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
//   if (this.isModified("postedOn") && this.postedOn instanceof Date) {
//     this.postedOn = this.postedOn.getTime();
//   }
  next();
});

storySchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  // Clean up related data, e.g., remove story from users' registered lists
  // You can require User model here if needed
  // Example: await User.updateMany({}, { $pull: { eventsRegistered: this._id } });
  next();
});

storySchema.pre("findOneAndDelete", async function (next) {
  // Clean up related data for findOneAndDelete
  // Example: await ...
  next();
});

// Post Hooks
storySchema.post("save", function (doc) {
  // Example: send notification or log
  // console.log(`Event created/updated: ${doc._id}`);
});

storySchema.post("deleteOne", { document: true, query: false }, function (doc) {
  // Example: log deletion
  // console.log(`Event deleted: ${doc._id}`);
});

// Instance Methods
storySchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

storySchema.methods.isOwner = function (userId) {
  return this.postedBy && this.postedBy.toString() === userId.toString();
};

// Static Methods
storySchema.statics.findByOwner = function (ownerId) {
  return this.find({ postedBy: ownerId });
};


const Story = mongoose.model("Story", storySchema);
module.exports = { Story };
