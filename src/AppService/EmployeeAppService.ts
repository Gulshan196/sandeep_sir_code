import { Injectable } from "@nestjs/common";
import { AppService } from "src/app.service";
import { EmployeeDto } from "src/Dtos/EmployeeDto";
import {Employee} from "src/Entities/Employee";
import { EmployeeRepository } from "src/Repositories/EmployeeRepository";
import { RepositoryBase } from "src/Repositories/RepositoryBase";
import ApplicationService from "./ApplicationService";


@Injectable()
export default class EmployeeAppService extends ApplicationService<Employee, EmployeeDto>{
    
    //private repository = new EmployeeRepository();
//private readonly repository_temp:RepositoryBase<Employee>
    constructor(employeeRepository: EmployeeRepository){
        super(employeeRepository);
       // super(new EmployeeRepository());

        //, temp_exployee_data_processing_function
        //todo: check how to pass func ref to contruction of base

        //super.repository
       // this.repository = repository_temp;
        
    }

    

    public exployee_data_processing_function(){

    }

    CreateEntityInstance(): Employee {
        let emp = new Employee();
        emp.id=34;
        emp.age = 45;
        emp.name = 'xyz';
        return emp;
    };



    CreateDtoInstance(): EmployeeDto {
        let dto =  new EmployeeDto();
        //let emp = new Employee();
        dto.id=34;
        dto.age = 45;
        dto.name = 'xyz';
        return dto;
    };

    ConvertDtoToEntity(dto: EmployeeDto): Employee {
       let employee_entity = new Employee();
       employee_entity.id = dto.id;
       employee_entity.age = dto.age;
       employee_entity.name = dto.name;

       return employee_entity;
       

    }
    ConvertEntityToDto(entity: Employee): EmployeeDto {
        let employee_dto = new EmployeeDto();
        employee_dto.id = entity.id;
        employee_dto.age = entity.age;
        employee_dto.name = entity.name;
 
        return employee_dto;
    }
    
    



}