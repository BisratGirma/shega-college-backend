"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataSourceOptionsPG = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "S3cr3t",
    database: "college_db",
    synchronize: true,
    logging: false,
    entities: ["src/models/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: ["src/subscribers/**/*.ts"],
};
const dataSourceOptionsMongoDB = {
    type: "mongodb",
    host: "mongodb+srv://shega-college:<password>@cluster0.zzn47w0.mongodb.net/",
    username: "shega-college",
    password: "4915vi2ou6DZqK8Y",
    database: "college",
    synchronize: true,
    logging: false,
    entities: ["src/models/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: ["src/subscribers/**/*.ts"],
};
exports.default = { dataSourceOptionsMongoDB, dataSourceOptionsPG };
