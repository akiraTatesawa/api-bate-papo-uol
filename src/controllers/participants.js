import chalk from "chalk";
import dayjs from "dayjs";
// eslint-disable-next-line import/no-unresolved
import { stripHtml } from "string-strip-html";

import { db } from "../db.js";

import { participantSchema } from "../validations/joiValidations.js";

export async function postParticipants(req, res) {
  const newUser = { name: stripHtml(req.body.name).result.trim() };
  const { error } = participantSchema.validate(newUser);

  if (error) {
    console.log(error.details);
    return res.sendStatus(422);
  }

  try {
    const { name: username } = newUser;

    const isUsernameBeingUsed = Boolean(
      await db.collection("participants").findOne(newUser)
    );

    if (isUsernameBeingUsed) {
      console.log(
        chalk.red("The username"),
        chalk.red.bold(username),
        chalk.red("is already being used!")
      );

      return res.sendStatus(409);
    }

    await db
      .collection("participants")
      .insertOne({ ...newUser, lastStatus: Date.now() });

    await db.collection("messages").insertOne({
      from: username,
      to: "Todos",
      text: "entra na sala...",
      type: "status",
      time: dayjs().format("HH:mm:ss"),
    });

    console.log(
      chalk.green("User"),
      chalk.green.bold(username),
      chalk.green("successfully registered!")
    );
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
