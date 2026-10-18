const express = require("express");
const upload = require("../middleware/upload.middleware");
const {
  createDocument,
} = require("../controllers/document.controller");

const router = express.Router();

router.post("/upload", upload.single("pdf"), createDocument);

module.exports = router;