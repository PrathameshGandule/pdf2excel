const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const { MONGO_URI } = process.env
console.log(MONGO_URI)

const connectToMongoDB = async () => {
    try {
      console.log('Connecting to MongoDB...')
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'pdf-data-extraction'
      })
      console.log('MongoDB Connected...')
    } catch (err) {
      console.error(err.message)
      process.exit(1)
    }
  }
module.exports = connectToMongoDB;
