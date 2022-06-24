import chalk from "chalk";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

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

export async function deleteMessages(req, res) {
  const { idMessage } = req.params;
  const username = req.header("user");
  const filter = { _id: new ObjectId(idMessage) };

  try {
    // A mensagem existe ?
    const message = await db.collection("messages").findOne(filter);

    if (!message) {
      console.log(chalk.red("Message not found"));
      return res.sendStatus(404);
    }

    // Quem faz a requisição é o autor da mensagem?
    const isTheMessageAutor = message.from === username;

    if (!isTheMessageAutor) {
      return res.sendStatus(401);
    }

    await db.collection("messages").deleteOne(filter);

    console.log(chalk.green("Message deleted successfully"));
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
