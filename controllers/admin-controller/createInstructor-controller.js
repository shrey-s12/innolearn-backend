const Instructor = require("../../models/Instructor");
const bcrypt = require("bcryptjs");

// Create a new instructor
const createInstructor = async (req, res) => {
    const { instructorName, instructorEmail, instructorPassword, instructorUserName, role, instructorProfilePicture, instructorPhone, instructorAddress, instructorQualification, instructorExperience, instructorSpecialization, instructorLinkedinProfile, instructorBio } = req.body;

    const existingInstructor = await Instructor.findOne({
        $or: [{ instructorEmail }, { instructorUserName }],
    });

    if (existingInstructor) {
        return res.status(400).json({
            success: false,
            message: "Instructor name or instructor email already exists",
        });
    }

    const hashPassword = await bcrypt.hash(instructorPassword, 10);
    const newInstructor = new Instructor({
        instructorName,
        instructorEmail,
        instructorPassword: hashPassword,
        instructorUserName,
        role,
        instructorProfilePicture,
        instructorPhone,
        instructorAddress,
        instructorQualification,
        instructorExperience,
        instructorSpecialization,
        instructorLinkedinProfile,
        instructorBio,
    });

    await newInstructor.save();

    return res.status(201).json({
        success: true,
        message: "Instructor registered successfully!",
    });
};

// Get all instructors
const getAllInstructors = async (req, res) => {
    try {
        const instructors = await Instructor.find();
        res.status(200).json(instructors);
    } catch (error) {
        res.status(400).json({ message: "Error fetching instructors", error });
    }
};

// Get an instructor by ID
const getInstructorById = async (req, res) => {
    try {
        const instructor = await Instructor.findById(req.params.id);
        if (!instructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }
        res.status(200).json(instructor);
    } catch (error) {
        res.status(400).json({ message: "Error fetching instructor", error });
    }
};

// Update an instructor
const updateInstructor = async (req, res) => {
    try {
        const updatedInstructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInstructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }
        res.status(200).json({ message: "Instructor updated successfully", instructor: updatedInstructor });
    } catch (error) {
        res.status(400).json({ message: "Error updating instructor", error });
    }
};

// Delete an instructor
const deleteInstructor = async (req, res) => {
    try {
        const deletedInstructor = await Instructor.findByIdAndDelete(req.params.id);
        if (!deletedInstructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }
        res.status(200).json({ message: "Instructor deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting instructor", error });
    }
};

module.exports = {
    createInstructor,
    getAllInstructors,
    getInstructorById,
    updateInstructor,
    deleteInstructor,
};