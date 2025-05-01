const Live = require("../models/LiveStream");

exports.addNewlive = async (req, res) => {
    try {
        const liveData = req.body;
        const newlyCreatedCourse = new Live(liveData);
        const saveCourse = await newlyCreatedCourse.save();

        if (saveCourse) {
            res.status(201).json({
                success: true,
                message: "Course saved successfully",
                data: saveCourse,
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

exports.getAlllive = async (req, res) => {
    console.log("helllo  motorola")
    try {
        const coursesList = await Live.find({});

        res.status(200).json({
            success: true,
            data: coursesList,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured while fetching courses",
        });
    }
};

exports.getCourseDetailsByID = async (req, res) => {
    try {
        const { id } = req.params;
        const courseDetails = await Live.findById(id);

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found!",
            });
        }

        res.status(200).json({
            success: true,
            data: courseDetails,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

exports.deleteLiveById = async (req, res) => {
    try {
        // Retrieve the ID from the URL parameters
        const { id } = req.params;

        // Attempt to delete the record with the specified ID
        const deletedCourse = await Live.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred while deleting the course",
        });
    }
};
