import chalk from "chalk";
import { db } from "../db.js";

export async function postStatus(req, res) {
  const username = req.header("user");
  const filterDoc = { name: username };

  try {
    const isUserFromParticipantsList = Boolean(
      await db.collection("participants").findOne(filterDoc)
    );

    if (!isUserFromParticipantsList) {
      console.log(
        chalk.red("The user"),
        chalk.red.bold(username),
        chalk.red("is not listed!")
      );
      return res.sendStatus(404);
    }

    const updateStatus = {
      $set: {
        lastStatus: Date.now(),
      },
    };

    await db.collection("participants").updateOne(filterDoc, updateStatus);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
