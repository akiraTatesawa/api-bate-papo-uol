import chalk from "chalk";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

let database = null;

try {
  const mongoClient = new MongoClient(process.env.URL_CONNECT_MONGO);

  await mongoClient.connect();
  database = mongoClient.db(process.env.DATABASE_NAME);

  console.log(chalk.bold.green("\nConnected to the database..."));
} catch (err) {
  console.log(err);
  console.log(chalk.bold.red("\nFailed to connect to the database"));
}

export const db = database;
