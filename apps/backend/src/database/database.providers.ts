import { join } from 'path';
import { DataSource } from 'typeorm';
import { CreateTable1673218477897 } from '../migrations/1673218477897-CreateTable';
import { config } from 'dotenv';

config({
  path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env',
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_TABLE,
        entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
        synchronize: process.env.NODE_ENV === 'test' ? true : false, //*** NÃO USAR EM PRODUÇÃO!! Pode apagar os dados das tabelas!! ***
        //migrationsTableName: 'TbMarTelecomMigrations', se precisar mudar o nome da tabela migrations
        logging: false,
      });

      return dataSource.initialize();
    },
  },
];
export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_TABLE,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: process.env.NODE_ENV === 'test' ? true : true, //*** NÃO USAR EM PRODUÇÃO!! Pode apagar os dados das tabelas!! ***
  //migrationsTableName: 'TbMarTelecomMigrations', se precisar mudar o nome da tabela migrations
  logging: false,
  migrations: [CreateTable1673218477897],
});
