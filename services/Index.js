const StudentCourses = require("../models/StudentCourses"); // Adjust the path as necessary

const checkCoursePurchaseInfoService = async (studentId, courseId) => {
  try {
    const studentCourses = await StudentCourses.findOne({ userId: studentId });

    if (!studentCourses) {
      return {
        success: false,
        message: "No courses found for this student",
      };
    }

    const ifStudentAlreadyBoughtCurrentCourse =
      studentCourses.courses.findIndex((item) => item.courseId === courseId) > -1;

    return {
      success: true,
      data: ifStudentAlreadyBoughtCurrentCourse,
    };
  } catch (error) {
    console.error("Error checking course purchase info:", error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

module.exports = {
  checkCoursePurchaseInfoService,
};