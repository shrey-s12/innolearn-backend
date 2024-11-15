const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
    instructorName: String,
    instructorEmail: String,
    instructorPassword: String,
    instructorUserName: String,
    role: String,
    instructorProfilePicture: String,
    instructorPhone: String,
    instructorAddress: String,
    instructorQualification: String,
    instructorExperience: String,
    instructorSpecialization: [String],
    instructorLinkedinProfile: String,
    instructorBio: String,
});

module.exports = mongoose.model("Instructor", InstructorSchema);