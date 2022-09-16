

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

import { EntityBase } from "./EntityBase";


@Entity()
export class Employee extends EntityBase{
   

    constructor(){
        super();
        this.name='';
        this.age=0;
        
    }

    @Column({ name:'age' })
    age:number;

    @Column({ name:'emp_name' })
    public name:string;

}