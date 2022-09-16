import { Injectable } from "@nestjs/common";
import { resolve } from "path";
import { DtoBase } from "src/Dtos/DtoBase";
import { EntityBase } from "src/Entities/EntityBase";
import Condition from "src/Models/Condition";
import ResponseModel from "src/Models/ReponseModel";
import RequestModel from "src/Models/RequestModel";
import RequestModelQuery from "src/Models/RequestModelQuery";
import { RepositoryBase } from "src/Repositories/RepositoryBase";


@Injectable()
export default abstract class ApplicationService<TEntity extends EntityBase, TDto extends DtoBase>{

    protected repository:RepositoryBase<TEntity>;

//protected repository:RepositoryBase<TEntity>
    constructor(repository:RepositoryBase<TEntity>){

        //
        this.repository = repository;

        console.log('printing the repository');
        console.log(this.repository);

        if(this.repository!=null){
            this.repository.entityInstanceFunction = this.CreateEntityInstance;
        }

        //this.repository = new (null);
           // repository.entityInstanceFunction = this.CreateEntityInstance();

    }

    abstract CreateEntityInstance():TEntity;

    abstract CreateDtoInstance():TEntity;


    /** Every Application Service class has to implement this as per their DTO & Entity for proper conversion */
    abstract ConvertDtoToEntity(dto:TDto):TEntity;

    /** Every Application Service class has to implement this as per their DTO & Entity for proper conversion */
    abstract ConvertEntityToDto(entity:TEntity):TDto;

    async GetById(id:number):Promise<ResponseModel<TDto>>{

        let requestModelQuery = new RequestModelQuery();
        requestModelQuery.filter.conditions.push({
            field_name:'id',
            field_value:id,
            operator_type : '='
        })

        //example we get data in the for of Array<TEntity> in this case its Array<Employee>
        var repositoryModel = await this.repository.get(requestModelQuery);
        //convert the repository model to REponseModel<TDto> and then return to the user.
        let responseModel = new ResponseModel<TDto>();
        responseModel.dataCollection = new Array<TDto>();
        responseModel.pageInfo = repositoryModel.pageInfo;

        repositoryModel.dataCollection.forEach(element => {
            let dto = this.ConvertEntityToDto(element);
            responseModel.dataCollection.push(dto);

        }); 


        //call the repo of type TEntity which will return promise of TDto
        return responseModel;
    }

    async Get(requestModelQuery:RequestModelQuery):Promise<ResponseModel<TDto>>{
        let repository_model = await this.repository.get(requestModelQuery);

        //convert the repository model to REponseModel<TDto> and then return to the user.
        let responseModel = new ResponseModel<TDto>();
        responseModel.dataCollection = new Array<TDto>();
        responseModel.pageInfo = repository_model.pageInfo;

        repository_model.dataCollection.forEach(element => {
            let dto = this.ConvertEntityToDto(element);
            responseModel.dataCollection.push(dto);

        }); 
        return responseModel;
    }

    async Post(requestModel:RequestModel<TDto>):Promise<ResponseModel<TDto>>{

        // async convertDtoToEntites():Array<TEntity>{

        // }
        //call the app service which will return promise of TDto
        return ;
    }

    convertDtoToEntites(dtos:Array<TDto> ):Array<TEntity>{
        //covertion logic
        let array_of_tEntities = new Array<TEntity>();
        return array_of_tEntities;
    }

    async Put(id:number, requestModel:RequestModel<TDto>):Promise<ResponseModel<TDto>>{

        //call the app service which will return promise of TDto
        return ;
    }

    async Delete(id:number):Promise<boolean>{

        //call the app service which will return promise of TDto
        return ;
    }
}


