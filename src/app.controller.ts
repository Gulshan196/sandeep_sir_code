import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';

import {  EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log('test');
  }

  @Get()
  getHello(): string {
    //let x = this.client.send('greeting1', 'Progressive Coder');
    //this.client.emit<any>('message printed',new MessagePattern('hello world'));
    return this.appService.getHello();


  }

  // @MessagePattern({cmd:'greeting'})
  // getGreetingMessage(name: string): void {
  //   console.log('dsdsd' );
  // }
}
