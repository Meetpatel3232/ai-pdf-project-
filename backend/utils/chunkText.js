function splitIntoChunks(text, chunkSize = 1000, overlap = 150) {
  if (typeof text !== "string" || !text.trim()) {
    return [];
  }

  if (overlap < 0 || chunkSize <= 0 || overlap >= chunkSize) {
    throw new Error("Invalid chunk size or overlap");
  }

  const chunks = [];
  const step = chunkSize - overlap;

  for (let start = 0; start < text.length; start += step) {
    const chunk = text.slice(start, start + chunkSize).trim();

    if (chunk) {
      chunks.push({
        text: chunk,
        chunkIndex: chunks.length,
      });
    }

    if (start + chunkSize >= text.length) {
      break;
    }
  }

  return chunks;
}

module.exports = splitIntoChunks;