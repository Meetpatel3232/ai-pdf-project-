const express = require("express");
const { askDocumentQuestion } = require("../controllers/question.controller");

const router = express.Router();

router.post("/ask", askDocumentQuestion);

module.exports = router;