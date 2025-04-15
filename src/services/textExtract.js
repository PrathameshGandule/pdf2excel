
const PDFExtract = require("pdf.js-extract").PDFExtract;
const path = require('path');
const mongoose = require('mongoose');
const connectToMongoDB = require("./db/connectDB")

const pdfExtract = new PDFExtract();
const options = {}; // You can specify options if needed

const processPages = async (filePath, filename) => {
  try {
    await connectToMongoDB()
    const data = await pdfExtract.extract(filePath, options);
    console.log(`Processing ${data.pages.length} pages...`);

    for (const [pageIndex, page] of data.pages.entries()) {
      console.log(`Processing page ${pageIndex + 1}...`);

      // Check if the page has content
      if (page.content && page.content.length > 0) {
        // Use const and template literals
        const extractedText = page.content
          .filter((element) => element.str && element.dir === "ltr")
          .map((element) => element.str)
          .join(" ");
        const document = {
          page: pageIndex + 1,
          textContent: extractedText.trim(),
          filename: filename,
          numberOfPages: data.pages.length,
        };

        await mongoose.connection.collection('extractedtexts').insertOne(document);
        console.log(`Inserted document for page ${pageIndex + 1}`);
      } else {
        // Log the empty or undefined pages
        console.log(`Page ${pageIndex + 1} has no content`);
      }
    }
    console.log('Extraction and insertion completed successfully!');
    await mongoose.disconnect()
  } catch (err) {
    console.error(err);
  }
};


module.exports = processPages;