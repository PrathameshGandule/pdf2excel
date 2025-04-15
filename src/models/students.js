const mongoose = require("mongoose");

// Define your Mongoose schema
const Schema = mongoose.Schema;

const studentResultSchema = new Schema({
    filename: { type: String, required: true },
    seat_no: { type: String, required: true },
    name: { type: String, required: true },
    mother_name: { type: String, required: true },
    prn_no: { type: String, required: true },
})
    
// Create a Mongoose model based on the schema
const DataModel = mongoose.model("studentResult", studentResultSchema);

// Export the model
module.exports = DataModel;