const { retrieveChunks } = require("./retrieval.service");
const { generateAnswer } = require("./generation.service");

const askQuestion = async (question, documentId) => {
  const retrievedChunks = await retrieveChunks(question, documentId);

  const answer = await generateAnswer(question, retrievedChunks);

  return {
    answer,
    sources: retrievedChunks.map((chunk) => ({
      chunkIndex: chunk.chunkIndex,
      text: chunk.text,
      score: chunk.score,
    })),
  };
};

module.exports = { askQuestion };