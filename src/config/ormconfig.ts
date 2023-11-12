import { DataSourceOptions } from "typeorm";

const dataSourceOptions: DataSourceOptions = {
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

export default dataSourceOptions;
