const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    // store phone numbers as strings to keep formatting flexible and avoid
    // coercion problems when validating on the controller side
    phoneNumber: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    avatar: {
      type: String,
    },
    address: {
      type: String,
    },
    about : {
      type : String,
      default : "Hey! I am new @EmbraceAutism"
    },
    // `enum` (not `enums`) is the correct mongoose option
    userType: {
      type: String,
      enum: ["Adult", "Child"],
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    termsAgreed: {
      type: Boolean,
      required: true,
    },
    eventsRegistered : [
      {
        type : Schema.Types.ObjectId ,
        ref : "Event"
      }
    ]
  },
  { timestamps: true }
);

userSchema.virtual("age").get(function () {
  if (!this.DOB) return null;
  const today = new Date();
  const birthDate = new Date(this.DOB);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
});

userSchema.pre("save", async function (next) {
  if (this.isModified("DOB") || this.isNew) {
    const today = new Date();
    const birthDate = new Date(this.DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    this.userType = age < 18 ? "Child" : "Adult";
  }

  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
  
  userSchema.methods.generateAccessTokens = function () {
    return jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email,
      fullName: this.firstName + "" + this.lastName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshTokens = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.pre("deleteOne", async function (next) {
  //delete this user's stories, campaigns and events

  next();
});

userSchema.methods.registerForEvent = function (eventId) {
  const exists = this.eventsRegistered.some(
    (eid) => eid.toString() === eventId.toString()
  );
  if (!exists) {
    this.eventsRegistered.push(eventId);
    return this.save();
  }
  return Promise.resolve(this);
};

userSchema.methods.unregisterFromEvent = function (eventId) {
  this.eventsRegistered = this.eventsRegistered.filter(
    (eid) => eid.toString() !== eventId.toString()
  );
  return this.save();
};

userSchema.methods.isRegisteredForEvent = function (eventId) {
  return this.eventsRegistered.some(
    (eid) => eid.toString() === eventId.toString()
  );
};

userSchema.methods.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findAdults = function() {
  return this.find({ userType: "Adult" });
};

userSchema.statics.findChildren = function() {
  return this.find({ userType: "Child" });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
