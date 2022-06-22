import express from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";

import { routes } from "./routes.js";
import { handleInactiveUsers } from "./handleInactiveUsers.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(chalk.bgGreen.black.bold("Server running on port 5000...\n"));
});

handleInactiveUsers();
