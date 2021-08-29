const mongoose = require("mongoose");

const { Schema } = mongoose;
const Bike = require("./Bike");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    bikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bike",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  console.log("new", this);
  console.log("modified:", this.isModified("password"));

  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("bikeCount").get(function() {
    return this.bikes.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;