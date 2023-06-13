"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.databaseProviders = void 0;
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const _1673218477897_CreateTable_1 = require("../migrations/1673218477897-CreateTable");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env',
});
exports.databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new typeorm_1.DataSource({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_TABLE,
                entities: [(0, path_1.join)(__dirname, '..', '**', '*.entity.{ts,js}')],
                synchronize: process.env.NODE_ENV === 'test' ? true : false,
                logging: false,
            });
            return dataSource.initialize();
        },
    },
];
exports.dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_TABLE,
    entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: process.env.NODE_ENV === 'test' ? true : true,
    logging: false,
    migrations: [_1673218477897_CreateTable_1.CreateTable1673218477897],
});
//# sourceMappingURL=database.providers.js.map