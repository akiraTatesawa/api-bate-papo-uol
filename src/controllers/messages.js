import chalk from "chalk";
import dayjs from "dayjs";

import { db } from "../db.js";

import { messageSchema } from "../validations/joiValidations.js";

export async function postMessages(req, res) {
  const { error } = messageSchema.validate(req.body, { abortEarly: true });

  if (error) {
    console.log(error.details);
    return res.sendStatus(422);
  }

  const messageFromUser = req.header("user");

  try {
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

export async function getMessages(req, res) {
  try {
    const limit = parseInt(req.query.limit, 10) || Number.MAX_VALUE;
    const username = req.header("user");

    const messages = await db
      .collection("messages")
      .find({
        $or: [
          { to: username },
          { to: "Todos" },
          { from: username },
          { type: "message" },
        ],
      })
      .toArray();

    messages.splice(0, messages.length - limit);

    return res.send(messages);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
