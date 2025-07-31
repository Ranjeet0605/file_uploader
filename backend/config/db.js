const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })
        console.log("MongoDb connected successfully");
    }
    catch (error) {
        console.error("MongoDb connection failed", error);
        process.exit(1); // exit the proccess with failure

    }
}
module.exports = connectDb;