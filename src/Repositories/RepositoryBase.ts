import { Injectable } from "@nestjs/common";
import { EntityBase } from "src/Entities/EntityBase";
import { PageInfo } from "src/Models/PageInfo";
import ResponseModel from "src/Models/ReponseModel";
import RepositoryModel from "src/Models/RepositoryModel";
import RequestModelQuery from 'src/Models/RequestModelQuery';
import Typefinder from "src/Utilities/TypeFinder";

import { DataSource, Repository } from "typeorm";

var pluralize = require('pluralize')

@Injectable()
export class RepositoryBase<TEntity extends EntityBase>{

    //this function refers to function inside AppService where the actual Instance of the Entity is made
    public entityInstanceFunction: any;

    // protected entityName:string;

    protected repository: Repository<TEntity>;

    protected entityName: string;
    

    constructor() {

    }


    //async QueryBuilder(requestModelQuery:RequestModelQuery):

    async get(requestModelQuery: RequestModelQuery): Promise<RepositoryModel<TEntity>> {


        //this.repository.findAndCount()

        // const myDataSource = new DataSource(null);
        // getting data from db
        let array_from_db = this.repository != null ? await this.repository.findAndCount() : null;
        // (" array from db",array_from_db)
        // console.log(this.entityName)

        let entity_in_plural_form = pluralize(this.entityName);
        // console.log(entity_in_plural_form);

        let query_object = {};
        let query_condition = '';
        let iCount=0;

        requestModelQuery.filter.conditions.forEach((condition)=>{
            query_object[condition.field_name] = condition.field_value;
            
            query_condition+= iCount>0?" and ": "";

            query_condition+= condition.field_name + " " + condition.operator_type + " :" + condition.field_name;
            //  if(iCount==requestModelQuery.filter.conditions.length-1){
            //    query_condition+=")" 
            //  }
            iCount++;
        });



        // console.log(query_condition,query_object);
        

        var query_with_data = await this.repository.createQueryBuilder(entity_in_plural_form)
            .where(query_condition, query_object).getManyAndCount();
            //"id = :id"  { id: 2 } and "id= :id" { id:3 }


        console.log("query condition",query_condition+","+Object.values(query_object));
       // var t1 = await this.repository.findAndCount(query);

        //let typeFinder = new Typefinder<TEntity>(TEntity));

        // let x = typeof RepositoryModel<TEntity>;
        // console.log('printing type of response model');
        // console.log(x);

        //let x = this.repository.createQueryBuilder(typeof TEntity)

        // (await this.repository.findAndCount()).filter()



        // console.log(array_from_db);

        // array_from_db.then((value)=>{
        //     console.log(value);
        // });

        let temp_data = (this.entityInstanceFunction != null) ? this.entityInstanceFunction() : null;
        // temp data has initial values of class entity of employee 
        // console.log(Object.values(temp_data)+" temp wala")
        let repository_model = new RepositoryModel<TEntity>();
        repository_model.dataCollection = new Array<TEntity>();
        repository_model.pageInfo = new PageInfo();

        repository_model.pageInfo.total_records = array_from_db != null ? array_from_db[1] : 0;


        console.log(query_with_data[0][0])
        if (query_with_data != null && query_with_data.length > 0) {
            query_with_data[0].forEach((item) => {
                repository_model.dataCollection.push(item);
            });
        }
        // console.log(repository_model)
        //repository_model.dataCollection.push(temp_data);
        // console.log("repo wala",repository_model.dataCollection)

        //evaluate the total number of records in database
        return repository_model;
    }

    // getAll(requestModelQuery: RequestModelQuery): RepositoryModel<TEntity> {

    //     const myDataSource = new DataSource(null);
    //     //temp you can hardcode the data in entity and populate the pageInfo object


    //     //calling the function delegate if required which is specific to the respective applicaton class
    //     // if (this.function_delegate != null) {
    //     //     this.function_delegate();
    //     // }
    //     console.log('getall function call')
    //     let repositoryModel = new RepositoryModel<TEntity>();
    //     repositoryModel.pageInfo = new PageInfo();
    //     repositoryModel.dataCollection = new Array<TEntity>();

    //     //todo: get objects from db
    //     let obj = this.entityInstanceFunction;

    //     // console.log("entity wala",obj)

    //     repositoryModel.dataCollection.push(obj);

    //     //evaluate the total number of records in database
    //     return repositoryModel;
    // }  

     
      

    // async post(repositoryModel:RepositoryModel<TEntity>): Promise<RepositoryModel<TEntity>> {
    //     //post the array of entity stored in datacollection to the database
    //     let entity_in_plural_form = pluralize(this.entityName);
    //     let responseRepositoryModel = new RepositoryModel<TEntity>();

    //     //QueryDeepPartialEntity<TEntity>
    //     let posted_data_in_backend = await this.repository.save(repositoryModel.dataCollection);

    //     posted_data_in_backend.forEach((data)=>{
    //         responseRepositoryModel.dataCollection.push(data);
    //     });
        

    //     return responseRepositoryModel;

    // }

    async post(age:number,name:string): Promise<RepositoryModel<TEntity>> {
        // let entity_in_plural_form = pluralize(this.entityName);
        
        // console.log("this one is for last value",array_from_db[0][array_from_db[0].length-1])
        // console.log(array_from_db)
     await this.repository.createQueryBuilder().insert().into(this.entityName).values([{age:age,name:name}]).execute()
     let array_from_db = this.repository != null ? await this.repository.findAndCount() : null;
     let repository_model = new RepositoryModel<TEntity>();
     repository_model.dataCollection = new Array<TEntity>;
     repository_model.pageInfo = new PageInfo();
     repository_model.pageInfo.total_records = array_from_db != null ? array_from_db[1] : 0;
     repository_model.dataCollection.push(array_from_db[0][array_from_db[0].length-1])
    // let x= array_from_db
    // console.log(x)
    //  repository_model.pageInfo = new PageInfo();
    //  repository_model.pageInfo.total_records = array_from_db != null ? array_from_db[1] : 0;
    //  s
    
      return  repository_model
    }

    async getById(id:number): Promise<RepositoryModel<TEntity>> {
        let data_with_query = await this.repository.createQueryBuilder().select('emp').from(this.entityName,'emp').where("emp.id = :id",{id:id}
        ).getOne()
        let array_from_db = this.repository != null ? await this.repository.findAndCount() : null;
        let repository_model = new RepositoryModel<TEntity>();
        repository_model.dataCollection = new Array<TEntity>;
        repository_model.pageInfo = new PageInfo();
        repository_model.pageInfo.total_records = array_from_db != null ? array_from_db[1] : 0;
        repository_model.dataCollection.push(array_from_db[0].find(el=>el.id==id))
        // repository_model.pageInfo.page_number = 

        // let x=

        // console.log("this is what i want",x)
        return repository_model
    }


    async put(id:number,age:string,name:string): Promise<RepositoryModel<TEntity>> {
       
        await this.repository.createQueryBuilder().update(this.entityName).set({age:age,name:name}).where("id= :id",{id:id})
        .execute()
        let array_from_db = this.repository != null ? await this.repository.findAndCount() : null;
        let repository_model = new RepositoryModel<TEntity>();
        repository_model.dataCollection = new Array<TEntity>;
        repository_model.pageInfo = new PageInfo();
        repository_model.pageInfo.total_records = array_from_db != null ? array_from_db[1] : 0;
        repository_model.dataCollection.push(array_from_db[0].find(el=>el.id==id))
        // console.log(data_with_query)
        return repository_model
    }

    async delete(id:number): Promise<boolean> {
         //"id = :id"  { id: 2 }
       await this.repository.createQueryBuilder().delete().from(this.entityName).where("id= :id",{id:id}).execute()
        return true
    }
}