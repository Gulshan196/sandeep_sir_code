import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/Entities/Employee';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {

  constructor(){
   
  }
  getEmployees(): string {
    return 'Hello World From Empoyees';
  }

  
  get(id: number): string {
   // let id2 = id;
    return 'Hello World From Empoyees by Id' + id.toString();
  }


}
