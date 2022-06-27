import chalk from "chalk";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";
// eslint-disable-next-line import/no-unresolved
import { stripHtml } from "string-strip-html";

import { db } from "../db.js";

import { messageSchema } from "../validations/joiValidations.js";

export async function postMessages(req, res) {
  const messageFromReq = {
    ...req.body,
    text: stripHtml(req.body.text).result.trim(),
  };

  const { error } = messageSchema.validate(messageFromReq, {
    abortEarly: true,
  });

  if (error) {
    console.log(error.details);
    return res.sendStatus(422);
  }

  const messageAuthor = req.header("user");

  try {
    const message = {
      from: messageAuthor,
      ...messageFromReq,
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
    const message = await db.collection("messages").findOne(filter);

    if (!message) {
      console.log(chalk.red("Message not found"));
      return res.sendStatus(404);
    }

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

export async function putMessages(req, res) {
  const messageFromReq = {
    ...req.body,
    text: stripHtml(req.body.text).result.trim(),
  };

  const { error } = messageSchema.validate(messageFromReq, {
    abortEarly: true,
  });

  if (error) {
    console.log(error.details);
    return res.sendStatus(422);
  }

  const messageAuthor = req.header("user");
  const { idMessage } = req.params;

  const filter = { _id: new ObjectId(idMessage) };
  const updatedMessage = {
    $set: {
      from: messageAuthor,
      ...messageFromReq,
      time: dayjs().format("HH:mm:ss"),
    },
  };

  try {
    const message = await db.collection("messages").findOne(filter);

    if (!message) {
      console.log(chalk.red("Message not found"));
      return res.sendStatus(404);
    }

    const isTheMessageAutor = message.from === messageAuthor;

    if (!isTheMessageAutor) {
      return res.sendStatus(401);
    }

    await db.collection("messages").updateOne(filter, updatedMessage);

    console.log(chalk.green("Message edited successfully"));
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
