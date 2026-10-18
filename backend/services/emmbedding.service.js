const openai = require("./openai.service");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const createEmbeddings = async (chunks) => {
  if (!Array.isArray(chunks) || chunks.length === 0) {
    throw new Error("At least one chunk is required");
  }

  const texts = chunks.map((chunk) => chunk.text);

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  });

  return response.data.map((item) => item.embedding);
};

const createQueryEmbedding = async (question) => {
  if (typeof question !== "string" || !question.trim()) {
    throw new Error("A question is required");
  }

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: question.trim(),
  });

  return response.data[0].embedding;
};

module.exports = { createEmbeddings,createQueryEmbedding };