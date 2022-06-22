import chalk from "chalk";
import dayjs from "dayjs";

import { db } from "../db.js";

import { messageSchema } from "../validations.js";

export async function postMessages(req, res) {
  const { error } = messageSchema.validate(req.body, { abortEarly: true });

  if (error) {
    console.log(error.details);
    return res.sendStatus(422);
  }

  const messageFromUser = req.header("user");

  try {
    const isFromParticipantsList = Boolean(
      await db.collection("participants").findOne({ name: messageFromUser })
    );

    if (!isFromParticipantsList) {
      return res.sendStatus(422);
    }

    const message = {
      from: messageFromUser,
      ...req.body,
      time: dayjs().format("HH:mm:ss"),
    };

    await db.collection("messages").insertOne(message);

    console.log(chalk.green("Message sent!"));
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getMessages(_req, res) {
  try {
    const messages = await db.collection("messages").find().toArray();
    return res.send(messages);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
