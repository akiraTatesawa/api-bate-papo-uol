import chalk from "chalk";

export async function validateUserHeader(req, res, next) {
  const username = req.header("user");

  if (!username) {
    console.log(chalk.red("Must contain an User header!"));
    return res.sendStatus(422);
  }

  return next();
}
