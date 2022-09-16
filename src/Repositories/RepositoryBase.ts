import { Injectable } from "@nestjs/common";
import { EntityBase } from "src/Entities/EntityBase";
import { PageInfo } from "src/Models/PageInfo";
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
        let array_from_db = this.repository != null ? await this.repository.findAndCount() : null;

        let entity_in_plural_form = pluralize(this.entityName);
        console.log(entity_in_plural_form);

        let query_object = {};
        let query_condition = '';
        let iCount=0;

        requestModelQuery.filter.conditions.forEach((condition)=>{
            query_object[condition.field_name] = condition.field_value;
            
            query_condition+= iCount>0?" and ": "";

            query_condition+= condition.field_name + " " + condition.operator_type + " :" + condition.field_name;

            iCount++;
        });

        console.log(query_object);
        console.log(query_condition);

        var query_with_data = await this.repository.createQueryBuilder(entity_in_plural_form)
            .where(query_condition, query_object).getManyAndCount();
            //"id = :id"  { id: 2 }


        console.log(query_with_data);
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
        let repository_model = new RepositoryModel<TEntity>();
        repository_model.dataCollection = new Array<TEntity>();
        repository_model.pageInfo = new PageInfo();

        repository_model.pageInfo.total_records = array_from_db != null ? array_from_db[1] : 0;



        if (query_with_data != null && query_with_data.length > 0) {
            query_with_data[0].forEach((item) => {
                repository_model.dataCollection.push(item);
            });
        }
        //repository_model.dataCollection.push(temp_data);

        //evaluate the total number of records in database
        return repository_model;
    }

    getAll(requestModelQuery: RequestModelQuery): RepositoryModel<TEntity> {

        const myDataSource = new DataSource(null);
        //temp you can hardcode the data in entity and populate the pageInfo object


        //calling the function delegate if required which is specific to the respective applicaton class
        // if (this.function_delegate != null) {
        //     this.function_delegate();
        // }

        let repositoryModel = new RepositoryModel<TEntity>();
        repositoryModel.pageInfo = new PageInfo();
        repositoryModel.dataCollection = new Array<TEntity>();

        //todo: get objects from db
        let obj = this.entityInstanceFunction;

        repositoryModel.dataCollection.push(obj);

        //evaluate the total number of records in database
        return repositoryModel;
    }

    post(): RepositoryModel<TEntity> {
        return;

    }

    put(): RepositoryModel<TEntity> {
        return;


    }

    delete(): boolean {
        return;
    }
}