import chalk from "chalk";

import { db } from "../db.js";

export async function validateUserHeader(req, res, next) {
  const username = req.header("user");

  if (!username) {
    console.log(chalk.red("Must contain an User header!"));
    return res.sendStatus(422);
  }

  const isUsernameInParticipantsList = Boolean(
    await db.collection("participants").findOne({ name: username })
  );

  if (!isUsernameInParticipantsList) {
    console.log(
      chalk.red(
        `User ${chalk.bold.red(username)} is not in the participants list`
      )
    );

    return res.sendStatus(422);
  }

  return next();
}
