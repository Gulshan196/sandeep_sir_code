import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import amqp from 'amqp-connection-manager';

@Injectable()
export class AppService {
  constructor() { 

    //@Inject('HELLO_SERVICE') 
    //private client: ClientProxy
  }

  getHello(): string {
   // this.client.emit('book-created', {"bookName": "The Way Of Kings', 'author': 'Brandon Sanderson"});

   this.initialConnectToRabbitMQ();
    return 'Hello World!';
  }

  async initialConnectToRabbitMQ(){
    try {
      const msgBuffer = Buffer.from(JSON.stringify({ number: 10 }));
      const connection = await amqp.connect("amqp://localhost:5672");
      const channel = await connection.createChannel();
      await channel.assertQueue("cats_queue");
      await channel.sendToQueue("cats_queue", msgBuffer);
      console.log("Sending message to number queue");
      await channel.close();
      await connection.close();
    } catch (ex) {
      console.error(ex);
    }
  }

  // @EventPattern('book-created')
  // async handleGreetingEvent(data: Record<string, unknown>) {
  //   console.log(data);
  // }
}
