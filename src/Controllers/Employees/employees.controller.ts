import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { syncBuiltinESMExports } from 'module';
import EmployeeAppService from 'src/AppService/EmployeeAppService';
import { EmployeeDto } from 'src/Dtos/EmployeeDto';
import { EmployeeFacade } from 'src/Facade/EmployeeFacade';
import RequestModelQuery from 'src/Models/RequestModelQuery';
import { EmployeesService } from 'src/Services/employees.service';
import RequestModel from 'src/Models/RequestModel';
import ResponseModel from "src/Models/ReponseModel";

import { Headers } from '@nestjs/common';
import { EmployeeRepository } from 'src/Repositories/EmployeeRepository';
import RepositoryModel from 'src/Models/RepositoryModel';

@Controller('Employees')
export class EmployeesController {
  
   
  constructor(private readonly employeeFacade: EmployeeFacade,private employeerepository:EmployeeRepository) {

    console.log('printing Employee Facade');
    console.log(employeeFacade);

    //this.employeeFacade = new EmployeeFacade(new EmployeeAppService());

    console.log('Initializing Employee Controller Constructor');
    this.listner();
  }

  /** This function is called on Initialization of this Controller */
  onModuleInit() {
    console.log('Initializing Employee Controller');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  @Get()
  getEmployees(@Headers()headers: any): Promise<ResponseModel<EmployeeDto>> {
  //getEmployees(@Query()requestModelQuery: string): Promise<ResponseModel<EmployeeDto>> {

    let requestModelQuery_temp: RequestModelQuery;
    requestModelQuery_temp = headers['requestmodelquery'] ==null ? new RequestModelQuery():
         JSON.parse(headers['requestmodelquery']);

    let response = this.employeeFacade.Get(requestModelQuery_temp);
    return response;

  }

  @Get('/:id')
  get(@Param('id') id: number) {
   
     return this.employeerepository.getById(id)
  
  }

  @Delete('/delete/:id')
  DeleteId(@Param('id') id:number){
    return this.employeerepository.delete(id)
  // return this .employeeFacade.getALL()
  }

  @Post()
  insertquery(@Body() body: any){
    let response = this.employeerepository.post(body.age,body.name)
    return response
  }

  @Put('/:id')
  update(@Param('id') id:number,@Body() body:any){
    let response = this.employeerepository.put(id,body.age,body.name)
    return response
  }
  
 


  async listner() {
    //u will listne only queues associated with this contoller's request (PUt/POST/DELETE RESPONSES) ADDED/UPDATED/DELETED(inside api gateway)
    //  ADD/UPDATE/DELETE(in side microservice)
  }
}
