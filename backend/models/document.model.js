const mongoose =require("mongoose");

const chunkSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    chunkIndex: {
    type: Number,
    required: true,
  },  embedding: {
    type: [Number],
    required: true,
  }
});

const documentSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    chunks: [chunkSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);