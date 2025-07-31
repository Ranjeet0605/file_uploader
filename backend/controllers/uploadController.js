const fileSchema = require("../models/file");
const { enqueueJob } = require("../queue/queue");

exports.handleUpload = async (req, res) => {
    try {
        const file = req.file;

        const newFile = new fileSchema({
            filename: file.originalname,
            path: file.path,
        });
        await newFile.save();
        await enqueueJob(newFile._id);
        res.json({ message: "File uploaded & scan started" });
        
    } catch (error) {
        console.log(error);
    }
};

//get files
exports.getFiles = async (req, res) => {
    try {
        const files = await fileSchema.find().sort({ uploadedAt: - 1 });
        res.json(files);
    } catch (error) {
        console.log(error);
    }
}
