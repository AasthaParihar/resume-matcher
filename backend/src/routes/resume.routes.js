const express = require("express");
const multer = require("multer");
const {uploadResume} = require("../controllers/resume.controller");

const router = express.Router();

// store file in memory
const upload = multer({storage : multer.memoryStorage()});

router.post("/upload", upload.single("resume"), uploadResume);

module.exports = router;