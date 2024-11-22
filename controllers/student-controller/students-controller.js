const User = require("../../models/User");

const getAllStudents = async (req, res) => {
  try {
    const studentsList = await User.find({ role: "user" });
    res.status(200).json({
      success: true,
      data: studentsList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured while fetching students",
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const studentDetails = await User.findById(id);
    if (!studentDetails) {
      return res.status(404).json({
        success: false,
        message: "Student not found!",
      });
    }
    res.status(200).json({
      success: true,
      data: studentDetails,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudentDetails = req.body;
    const updatedStudent = await User.findByIdAndUpdate(
      id,
      updatedStudentDetails,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Student updated successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  updateStudent,
};
