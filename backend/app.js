const express = require("express");
const connectDb = require("./config/db");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extedend: true }));
 
const fileRoutes = require("./routes/fileRoutes");

app.use("/api/v1", fileRoutes);
connectDb();





module.exports =  app;