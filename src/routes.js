import express from "express";
import chalk from "chalk";
import dayjs from "dayjs";

import { participantSchema } from "./validations.js";
import { db } from "./db.js";

export const routes = express.Router();

routes.post("/participants", async (req, res) => {
  const { error } = participantSchema.validate(req.body);

  if (error) {
    return res.sendStatus(422);
  }

  try {
    const usernameSearch = await db
      .collection("participants")
      .findOne({ name: req.body.name });

    if (usernameSearch) {
      console.log(
        chalk.bgRed.black.bold(
          `The username "${usernameSearch.name}" is already being used\n`
        )
      );

      return res.sendStatus(409);
    }

    await db
      .collection("participants")
      .insertOne({ ...req.body, lastStatus: Date.now() });

    await db.collection("messages").insertOne({
      from: req.body.name,
      to: "Todos",
      text: "entra na sala...",
      type: "status",
      time: dayjs().format("HH:mm:ss"),
    });

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

routes.get("/participants", async (_req, res) => {
  try {
    const participants = await db.collection("participants").find().toArray();

    return res.send(participants);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

routes.post("/messages");

routes.get("/messages", async (req, res) => {
  try {
    const messages = await db.collection("messages").find().toArray();

    return res.send(messages);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

routes.post("/status");
