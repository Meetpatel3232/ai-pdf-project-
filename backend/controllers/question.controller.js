const mongoose = require("mongoose");
const { askQuestion } = require("../services/rag.service");

const askDocumentQuestion = async (req, res) => {
  try {
    const { question, documentId } = req.body;

    if (!question?.trim() || !documentId) {
      return res.status(400).json({
        message: "Question and documentId are required",
      });
    }

    if (!mongoose.isValidObjectId(documentId)) {
      return res.status(400).json({
        message: "Invalid documentId",
      });
    }

    const result = await askQuestion(question, documentId);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Question error:", error.message);

    return res.status(500).json({
      message: "Failed to answer question",
    });
  }
};

module.exports = { askDocumentQuestion };