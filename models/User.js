const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userFullName: String,
  userName: String,
  userEmail: String,
  password: String,
  confirmPassword: String,
  role: String,
  userPhoneNumber: String,
  userProfilePicture: { type: String, default: "https://res.cloudinary.com/dy88vophl/image/upload/v1732281036/b8gatghaiodpi0bjf9wd.png" },
  userAddress: {
    country: String,
    state: String,
    city: String,
    street: String,
  },
  userDateOfBirth: Date,
  userGender: String,
  userBio: { type: String, default: "" },
  userLinkedinProfile: { type: String, default: "" },
  userWebsite: { type: String, default: "" },
  userInterests: [String],
  userSpecialization: { type: [String], default: [] },
  userIsActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", UserSchema);
