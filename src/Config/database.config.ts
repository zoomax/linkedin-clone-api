import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const DBConfigOptions: TypeOrmModuleOptions = {
  username: 'postgres',
  host: 'localhost',
  port: 5432,
  type: 'postgres',
  password: '11111111',
  database: 'linkedin',
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.js,.ts}'],
};
const newConfiguration: TypeOrmModuleOptions = {
  username: process.env.POSTGRES_USERNAME,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  type: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.js,.ts}'],
};

console.log(DBConfigOptions);
export default DBConfigOptions;
