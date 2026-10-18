const pdfParse = require("pdf-parse");

const Document = require("../models/document.model");
const DocumentChunk = require("../models/documentChunk.model");

const splitIntoChunks = require("../utils/chunkText");
const {
  createEmbeddings,
} = require("../services/embedding.service");

const createDocument = async (req, res) => {
  let document;

  try {
    const { title } = req.body;

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Document title is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF file",
      });
    }

    // 1. Extract text from the uploaded PDF buffer
    const pdfData = await pdfParse(req.file.buffer);
    const extractedText = pdfData.text?.trim();

    if (!extractedText) {
      return res.status(400).json({
        message: "No text could be extracted from this PDF",
      });
    }

    // 2. Split text into chunks
    const chunks = splitIntoChunks(extractedText);

    if (chunks.length === 0) {
      return res.status(400).json({
        message: "No usable text chunks were created",
      });
    }

    // 3. Generate embeddings
    const embeddings = await createEmbeddings(chunks);

    if (embeddings.length !== chunks.length) {
      throw new Error("Embedding count does not match chunk count");
    }

    // 4. Save the parent document
    document = await Document.create({
      title: title.trim(),
      filename: req.file.originalname,
    });

    // 5. Save each chunk with its parent document ID
    const chunkDocuments = chunks.map((chunk, index) => ({
      documentId: document._id,
      filename: req.file.originalname,
      text: chunk.text,
      chunkIndex: chunk.chunkIndex,
      embedding: embeddings[index],
    }));

    await DocumentChunk.insertMany(chunkDocuments);

    return res.status(201).json({
      message: "PDF processed and saved successfully",
      documentId: document._id,
      title: document.title,
      filename: document.filename,
      totalChunks: chunks.length,
    });
  } catch (error) {
    // Avoid leaving a parent record if chunk insertion fails.
    if (document?._id) {
      await Document.deleteOne({ _id: document._id }).catch(() => {});
    }

    console.error("Document processing error:", error.message);

    return res.status(500).json({
      message: "Failed to process PDF",
    });
  }
};

module.exports = { createDocument };