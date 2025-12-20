const client = require("amqplib");

class RabbitMqConnection {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    if (this.connection && this.channel) return;
    try {
      console.log("⏳ Connecting to RabbitMQ...");
      this.connection = await client.connect(process.env.RABBITMQ_URL);
      this.channel = await this.connection.createChannel();
      console.log("✅ RabbitMQ Connected Successfully!");
    } catch (err) {
      console.error("❌ RabbitMQ Connection Error:", err);
      throw err;
    }
  }
  async sendQueue(queue, mesg) {
    try {
      if (!this.channel) {
        await this.connect();
      }
      await this.channel.assertQueue(queue, { durable: true });

      const result = this.channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(mesg)),
        {
          persistent: true,
        }
      );

      return result;
    } catch (err) {
      console.error("❌ Failed to send message to RabbitMQ:", err);
    }
  }
}

module.exports = new RabbitMqConnection();
