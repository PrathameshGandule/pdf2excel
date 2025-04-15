//when we have array of json objects we can use json2xls to convert it to excel file
const json2xls = require('json2xls');
const textToJson = require('./textToJson');
const fs = require('fs');
const path = require('path');

const jsonToExcel = async (filename) => {
    try {
        const outputsDir = path.join(__dirname, '..', '..', 'outputs');
        const outputPath = path.join(outputsDir, `${filename}.xlsx`);

        // ✅ Check if directory exists, if not create it
        if (!fs.existsSync(outputsDir)) {
            fs.mkdirSync(outputsDir, { recursive: true });
            console.log('📂 Created outputs directory');
        }

        const data = await textToJson(filename);
        const xls = json2xls(data);

        fs.writeFileSync(outputPath, xls, 'binary');
        console.log('✅ Excel file written at', outputPath);

        return filename.toString();
    } catch (err) {
        console.error('🔥 Error in jsonToExcel:', err.message);
        throw new Error(`Conversion failed: ${err.message}`);
    }
};



module.exports = jsonToExcel;