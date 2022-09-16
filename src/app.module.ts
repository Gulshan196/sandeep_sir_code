import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './AppModules/Employees.module';
import ApplicationService from './AppService/ApplicationService';
import { EmployeesController } from './Controllers/Employees/employees.controller';
import FacadeBase from './Facade/FacadeBase';
import { RepositoryBase } from './Repositories/RepositoryBase';
import { EmployeesService } from './Services/employees.service';

import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_TYPE, DATABASE_USERNAME } from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Employee} from './Entities/Employee';

@Module({
  //HERE WE WILL IMPORT OTHER APP LEVEL MODULES
  imports: [
    EmployeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'newpass123@gk',
      database: 'postgres',

      entities: [Employee],
      //disable this for production
      synchronize: true,
      logging: true,
      subscribers: [],
    migrations: [],
    })
  ],
  //, EmployeesController
  //, EmployeesService
  controllers: [AppController],
  //AppService refers to some old types
  providers: [AppService, RepositoryBase, FacadeBase],
})
export class AppModule {}

/*

|---------------------------|   |---------------------------|   |---------------------------| 
|           MODULE          |   |           CONTROLLER      |   |-------PROVIDER------------|  
|---------------------------|   |---------------------------|   |---------------------------|   




main.ts

  |

AppModule

  |

 (all modules defined as per hierarchy) 

*/