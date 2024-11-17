const express = require("express");
const router = express.Router();
const {
    createInstructor,
    getAllInstructors,
    getInstructorById,
    updateInstructor,
    deleteInstructor
} = require("../../controllers/admin-controller/createInstructor-controller");

router.post("/create-instructor", createInstructor);
router.get("/get-instructors", getAllInstructors);
router.get("/get-instructor/details/:id", getInstructorById);
router.put("/update-instructor/:id", updateInstructor);
router.delete("/delete-instructor/:id", deleteInstructor);

module.exports = router;
