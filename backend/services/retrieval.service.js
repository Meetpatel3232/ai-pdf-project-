const DocumentChunk = require("../models/documentChunk.model");
const {
  createQueryEmbedding,
} = require("./embedding.service");

const retrieveChunks = async (question, documentId) => {
  const queryEmbedding = await createQueryEmbedding(question);

  const results = await DocumentChunk.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: 100,
        limit: 5,
        filter: {
          documentId: new mongoose.Types.ObjectId(documentId),
        },
      },
    },
    {
      $project: {
        text: 1,
        filename: 1,
        chunkIndex: 1,
        documentId: 1,
        score: { $meta: "vectorSearchScore" },
      },
    },
  ]);

  return results;
};

module.exports = { retrieveChunks };