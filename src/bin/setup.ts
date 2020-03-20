import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as commandLineArgs from 'command-line-args';
import {ConnectionOptions} from 'typeorm';

const todoList = {
  createORMFile: {
    task: "Create ormconfig.json",
    status: true
  }
}

const ROOT_DIR = path.resolve(__dirname, '..', '..');

if(fs.existsSync(`${ROOT_DIR}/.env`)){
	dotenv.config()
}
// Check typeORM documentation for more information.
const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || '123456',
  database: process.env.DATABASE_NAME || 'example',
  synchronize: false,
  logging: true,
  logger: "advanced-console",
  entities: [
    "src/**/entities/*.ts"
  ],
  migrations: [
    "src/migration/**/*.ts"
  ]
};
// sample : https://www.npmjs.com/package/command-line-args
const optionDefinitions = [
  { name: 'force', alias: 'f', type: Boolean }
]
const options : {
  force: boolean,
} = commandLineArgs(optionDefinitions)

console.info('STARTING SETUP')
console.log('---------------------')

// write file
const ormconfigFile = `${ROOT_DIR}/ormconfig.json`;
if( fs.existsSync(ormconfigFile) && !options.force){
  console.log(`The ormconfigfile has been existed ${ormconfigFile}`)
}else{
  try {
    fs.writeFileSync(ormconfigFile, JSON.stringify(ormconfig, null, 2));
    fs.chmodSync(ormconfigFile, 0o600)
    console.log(`Created new file ${ormconfigFile}`);
    fs.closeSync(2)
  } catch (error) {    
    console.error(error)
    todoList.createORMFile.status = false;
  }  
}

// statuses

Object.keys(todoList).map((k, idx) => {
  console.info(`${idx + 1}. ${todoList[k].task} - ${todoList[k].status ? 'success': 'failed'}`)
})

console.log('---------------------')
console.info('END SETUP')