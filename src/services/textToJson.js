const getText = require('./db/getText');
const devideText = require('./regex/devideTextConent.js');
const mergedJson = require('./regex/studentInfo.js');



async function textToJson(filename) {
    try {
        const text = await getText(filename)

        if (!text || text.length === 0) {
            throw new Error(`❌ getText() returned no content for filename: ${filename}`)
        }

        console.log('✅ getText output:', text.length, 'items')

        const textContent = text.map((t) => t.textContent)
        const modifiedTextContent = textContent.map((t) => devideText(t))
        const studentData = modifiedTextContent.map((t) => mergedJson(t))

        if (!studentData || studentData.length === 0) {
            throw new Error('❌ studentData is empty after processing')
        }

        console.log('✅ Final student data:', studentData.length, 'entries')

        return studentData

    } catch (err) {
        console.error('🔥 Error in textToJson():', err.message)
        throw err // Propagate the error to jsonToExcel
    }
}



module.exports = textToJson;






