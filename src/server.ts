import { DataSource } from "typeorm";

import dbConfig from "./config/ormconfig";

export const appDataSource = new DataSource(dbConfig.dataSourceOptionsMongoDB);

const connect = async () => {
  console.time("Time to connect to db");
  await appDataSource.initialize();
};

connect()
  .then(() => {
    console.clear();
    console.timeEnd("Time to connect to db");
    console.log("connected to db!");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

export default { appDataSource, connect };
