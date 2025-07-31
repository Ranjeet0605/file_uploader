const amqp = require('amqplib');
const queueName = 'scan_jobs';
const dotenv = require("dotenv");
dotenv.config();
  console.log("Connected to RabbitMQ");
async function enqueueJob(fileId) {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(fileId.toString()));
    setTimeout(() => connection.close(), 1000);
}
module.exports = { enqueueJob, queueName };