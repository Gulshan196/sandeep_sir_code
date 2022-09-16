import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Employee} from "src/Entities/Employee";
import { EntityBase } from "src/Entities/EntityBase";
import { PageInfo } from "src/Models/PageInfo";
import RepositoryModel from "src/Models/RepositoryModel";
import RequestModelQuery from 'src/Models/RequestModelQuery';

import { DataSource, Repository } from "typeorm";
import { RepositoryBase } from "./RepositoryBase";

@Injectable()
export class EmployeeRepository extends RepositoryBase<Employee>{

   // public entityInstanceFunction: any;

    constructor(@InjectRepository(Employee)private readonly usersRepository: Repository<Employee>) {
        super();
        super.repository = usersRepository;
        super.entityName = 'Employee';

//, typeof Employee
       // let x = usersRepository.find();
    }
    create(age:number,name:string,){
        const user = this.repository.create({age,name});
        return this.repository.save(user)
    }
    



    // get(): RepositoryModel<TEntity> {

    //     // const myDataSource = new DataSource(null);
       

    //     let temp_data = (this.entityInstanceFunction != null) ? this.entityInstanceFunction() : null;
    //     let repository_model = new RepositoryModel<TEntity>();
    //     repository_model.dataCollection = new Array<TEntity>();
    //     repository_model.pageInfo = new PageInfo();

    //     repository_model.dataCollection.push(temp_data);

    //     //evaluate the total number of records in database
    //     return repository_model;
    // }

    // getAll(requestModelQuery: RequestModelQuery): RepositoryModel<TEntity> {

    //     const myDataSource = new DataSource(null);
    //     //temp you can hardcode the data in entity and populate the pageInfo object

       
    //     //calling the function delegate if required which is specific to the respective applicaton class
    //     if (this.function_delegate != null) {
    //         this.function_delegate();
    //     }

    //     let repositoryModel = new RepositoryModel<TEntity>();
    //     repositoryModel.pageInfo = new PageInfo();
    //     repositoryModel.dataCollection = new Array<TEntity>();

    //     //todo: get objects from db
    //     let obj = this.entityInstanceFunction;

    //     repositoryModel.dataCollection.push(obj);

    //     //evaluate the total number of records in database
    //     return repositoryModel;
    // }

    // post(): RepositoryModel<TEntity> {
    //     return;

    // }

    // put(): RepositoryModel<TEntity> {
    //     return;


    // }

    // delete(): boolean {
    //     return;
    // }
}