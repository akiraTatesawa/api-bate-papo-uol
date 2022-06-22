import express from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";

import { handleInactiveUsers } from "./handleInactiveUsers.js";

import { messagesRoute } from "./routes/messagesRoute.js";
import { participantsRoute } from "./routes/participantsRoute.js";
import { statusRoute } from "./routes/statusRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(participantsRoute);
app.use(messagesRoute);
app.use(statusRoute);

app.listen(process.env.PORT, () => {
  console.log(chalk.bgGreen.black.bold("Server running on port 5000...\n"));
});

handleInactiveUsers();
