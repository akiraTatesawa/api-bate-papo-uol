import express from "express";
import chalk from "chalk";
import cors from "cors";

import { routes } from "./routes.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log(chalk.bgGreen.black.bold("\nServer is running...\n"));
});
