import { DtoBase } from "./DtoBase";


export class EmployeeDto extends DtoBase{


    constructor(){
        super();
    }

   
    age:number;

    
    public name:string;

}