const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const extractedTextSchema = new Schema({
  page: { type: Number, required: true },
  textContent: { type: String, required:true },
  filename: { type: String, required: true }, 
  numberOfPages: { type: Number, required: true },
});

const DataModel1 = mongoose.model("extractedText", extractedTextSchema);


module.exports = DataModel1;


