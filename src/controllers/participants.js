import chalk from "chalk";
import dayjs from "dayjs";

import { db } from "../db.js";
import { participantSchema } from "../validations.js";

export async function postParticipants(req, res) {
  const { error } = participantSchema.validate(req.body);

  if (error) {
    return res.sendStatus(422);
  }

  try {
    const isUsernameBeingUsed = Boolean(
      await db.collection("participants").findOne({ name: req.body.name })
    );

    if (isUsernameBeingUsed) {
      console.log(
        chalk.red("The username"),
        chalk.red.bold(req.body.name),
        chalk.red("is already being used!")
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
}

export async function getParticipants(_req, res) {
  try {
    const participants = await db.collection("participants").find().toArray();

    return res.send(participants);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
