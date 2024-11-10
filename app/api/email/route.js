import amqp from "amqplib";
import { NextResponse } from "next/server";

async function connectToRabbitMQ(email) {
  try {
    const connection = await amqp.connect(
      process.env.RABBITHOST || "amqp://localhost"
    );
    const channel = await connection.createChannel();
    const queue = "newsletter_notifications";

    await channel.assertQueue(queue, { durable: true });

    const message = JSON.stringify({ email });
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Failed to connect to RabbitMQ", error);
  }
}

export async function POST(req) {
  const { email } = await req.json();
  try {
    await connectToRabbitMQ(email);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message });
  }

  return NextResponse.json({ message: "Email sent successfully" });
}
