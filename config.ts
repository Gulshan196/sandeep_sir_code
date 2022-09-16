import { DotenvConfigOutput, config } from 'dotenv';

require('custom-env').env(true)

const envFound: DotenvConfigOutput = config();

if (!envFound) {
    throw new Error('.env file was not found.');
}


export const port: any =  3000;
export const DATABASE_TYPE: any =  'postgres';
export const DATABASE_USERNAME: any = 'postgres';
export const DATABASE_PASSWORD: any =  'newpass123@gk';
export const DATABASE_HOST: any = 'localhost';
export const DATABASE_PORT: any =  5432;
export const DATABASE_NAME: any =  'postgres';