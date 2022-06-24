import { db } from "../db.js";

export async function postStatus(req, res) {
  const username = req.header("user");
  const filterDoc = { name: username };

  try {
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
