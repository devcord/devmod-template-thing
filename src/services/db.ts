import { createConnection } from 'typeorm';
import { Tag } from '../entities';

export const establishDbConnection = () => createConnection({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT, 10),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [
    Tag,
  ],
  synchronize: true,
  logging: false,
});
