import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EmployeesController } from './Controllers/Employees/employees.controller';
import { QueryConverter } from './Utilities/query.converter';



async function bootstrap() {



  const port = process.env.port || 3000;
  //ORDINARY API
  const app = await NestFactory.create(AppModule);

  //app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useGlobalPipes(new QueryConverter());;

  // Then combine it with your microservice
  // const microservice = app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: { 
  //     urls: ['amqp://localhost:5672'],
  //     queue: 'cats_queue',
  //     queueOptions: {
  //       durable: false
  //     },}
  // });

  //microservice.listen();

  //microservice.get(EmployeesController);

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Basic Microservice')
    .setDescription('Basic Microservice API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //microservice.
  await app.startAllMicroservices();
  await app.listen(3001);



  //MICROSERVICE
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.TCP,
  //     options: { host: '127.0.0.1', port: 3000 }
  //   }
  // );

  // await app.listen();

  // await app.startAllMicroservicesAsync();
  // await app.listen(port);

  

  //ORDINARY API
  // await app.listen(port);
}
bootstrap();
