const amqp = require("amqplib");
const mongoose = require("mongoose");
const fs = require("fs");
const fileSchema = require("../models/file");
require('dotenv').config();
const { queueName } = require("../queue/queue");
const { channel } = require("diagnostics_channel");
mongoose.connect(process.env.DB_URL);


async function scanFileContent(content) {
    const keywords = ['rm -rf', 'eval', 'bitcoin'];
    return keywords.some(k => content.includes(k)) ? 'infected' : 'clean'; 
}
async function startWorker() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);

    channel.consume(queueName, async (msg) => {
        const fileId = msg.content.toString();
        const file = await fileSchema.findById(fileId);
        if (!file) return;
        setTimeout(async () => {
            const content = fs.readFileSync(file.path, 'utf-8');
            const result = await scanFileContent(content);
            file.status = 'scanned';
            file.result = result;
            file.scannedAt = new Date();
            await file.save();
            channel.ack(msg);
        }, Math.random() * 3000 + 2000);
    })
}
startWorker();
