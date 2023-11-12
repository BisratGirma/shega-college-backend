import { DataSourceOptions } from "typeorm";

const dataSourceOptionsPG: DataSourceOptions = {
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

const dataSourceOptionsMongoDB: DataSourceOptions = {
  type: "mongodb",
  url: "mongodb+srv://shega-college:4915vi2ou6DZqK8Y@cluster0.zzn47w0.mongodb.net/college",
  useUnifiedTopology: true,
  useNewUrlParser: true,
  synchronize: true,
  ssl: true,
  logging: true,
  entities: ["src/models/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
};

export default { dataSourceOptionsMongoDB, dataSourceOptionsPG };
