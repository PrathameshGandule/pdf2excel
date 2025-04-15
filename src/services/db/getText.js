const mongoose = require('mongoose');
const DataModel1 = require('../../models/textModel');
const connectToMongoDB = require('./connectDB');
const dotenv = require('dotenv');
dotenv.config();
const getText = async (filename) => {
    try {
        console.log("📥 Connecting to MongoDB...");
        await connectToMongoDB();

        console.log(`🔎 Searching for documents with filename: "${filename}"`);
        const data = await mongoose.connection
            .collection('extractedtexts')
            .find({ filename: filename })
            .toArray();

        if (!data || data.length === 0) {
            console.warn(`⚠️ No documents found in "extractedtexts" with filename: "${filename}"`);
        } else {
            console.log(`✅ Found ${data.length} documents.`);
        }

        await mongoose.connection.close();
        console.log("🔌 MongoDB connection closed.");
        return data;
    } catch (err) {
        console.error("🔥 Error in getText:", err.message);
        throw err;
    }
};




module.exports = getText;

//we will get text from database and devide it into three parts and return it as an array