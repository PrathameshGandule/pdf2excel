const Router = require("express").Router();
const upload = require("../middlewares/multerPDF");
const processPages = require("../services/textExtract");
const jsonToExcel = require("../services/jsonToExcel"); //testing part 1
const path = require("path");
const fs = require("fs");

Router.post("/upload", upload.single("pdf"), (req, res) => {
    console.log("req.file:", req.file); // log to debug
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded or wrong field name" });
    }

    const filePath = req.file.path;
    const filenameWithoutExt = path.basename(req.file.filename, path.extname(req.file.filename));

    console.log("filepath", filePath, "filename", filenameWithoutExt);

    processPages(filePath, filenameWithoutExt)
        .then(() => {
            res.send({
                message: "file uploaded successfully",
                filename: filenameWithoutExt,
            });
        })
        .catch((e) => {
            console.error(e);
            res.status(500).send("error uploading file");
        });
});

Router.post("/getCSV", async (req, res) => {
    const fileName = req.body.filename;
    console.log("filename", fileName);

    try {
        const convertedFilename = await jsonToExcel(fileName);
        const outputPath = path.join(__dirname, '..', '..', 'outputs', `${convertedFilename}.xlsx`);

        // Check if the file exists
        if (!fs.existsSync(outputPath)) {
            return res.status(404).send({
                message: "File not created"
            });
        }

        res.send({
            message: "File converted successfully",
            filename: convertedFilename,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "File conversion failed",
            error: err.message,
        });
    }
});


Router.get("/download/:filename", (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(
        __dirname,
        "..",
        "..",
        "outputs",
        `${fileName}.xlsx`
    );
    res.download(filePath);
});

module.exports = Router;
