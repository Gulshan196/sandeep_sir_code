import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { syncBuiltinESMExports } from 'module';
import EmployeeAppService from 'src/AppService/EmployeeAppService';
import { EmployeeDto } from 'src/Dtos/EmployeeDto';
import { EmployeeFacade } from 'src/Facade/EmployeeFacade';
import RequestModelQuery from 'src/Models/RequestModelQuery';
import { EmployeesService } from 'src/Services/employees.service';
import RequestModel from 'src/Models/RequestModel';
import ResponseModel from "src/Models/ReponseModel";

import { Headers } from '@nestjs/common';

@Controller('Employees')
export class EmployeesController {



  constructor(private readonly employeeFacade: EmployeeFacade) {

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
  get(@Param('id') id: number): string {
    //return this.employeesService.get(id);
    return id.toString();
  }


  async listner() {
    //u will listne only queues associated with this contoller's request (PUt/POST/DELETE RESPONSES) ADDED/UPDATED/DELETED(inside api gateway)
    //  ADD/UPDATE/DELETE(in side microservice)
  }
}
