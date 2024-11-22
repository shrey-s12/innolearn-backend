const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  updateStudent,
} = require("../../controllers/student-controller/students-controller");

router.get("/get-students", getAllStudents);
router.get("/get-student/details/:id", getStudentById);
router.put("/update-student/:id", updateStudent);

module.exports = router;
