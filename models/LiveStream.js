const mongoose = require("mongoose");

const LiveSchema = new mongoose.Schema({
    courseId: String,
    meetingLink: String,
});

module.exports = mongoose.model("Live", LiveSchema);