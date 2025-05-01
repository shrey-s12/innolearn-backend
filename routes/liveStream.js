const express = require('express');
const { addNewlive, getAlllive, deleteLiveById } = require("../controllers/LiveStream");

const router = express.Router();

router.post("/live", addNewlive);
router.get("/get", getAlllive);
router.delete("/delete/:id", deleteLiveById);
module.exports = router;