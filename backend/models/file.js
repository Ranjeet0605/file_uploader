const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    status: {
        type: String,
        default: "pending"
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    scannedAt: Date,
    result: String
});
module.exports = mongoose.model('file', fileSchema);