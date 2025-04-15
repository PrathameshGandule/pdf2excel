const express = require('express');
const app = express();
const uploadRouter = require('./routes/allRoutes');
const dotenv = require('dotenv')
dotenv.config()

app.use(express.json());

app.use('/pdf2excel', uploadRouter)
         
app.get('/', (req, res) => {
    res.send('welcome to pdf2excel');
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});