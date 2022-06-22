import dayjs from "dayjs";

import { db } from "./db.js";

export function handleInactiveUsers() {
  const TIME_INTERVAL = 15 * 1000;
  const INACTIVITY_TIME = 10 * 1000;

  setInterval(async () => {
    try {
      const participants = await db.collection("participants").find().toArray();
      const inactiveUsers = participants.filter(
        (user) => Date.now() - user.lastStatus > INACTIVITY_TIME
      );

      const inactiveUsersQuery = {
        lastStatus: { $lt: Date.now() - INACTIVITY_TIME },
      };
      await db.collection("participants").deleteMany(inactiveUsersQuery);
      await db.collection("messages").insertMany(
        inactiveUsers.map((user) => ({
          from: user.name,
          to: "Todos",
          text: "sai da sala...",
          type: "status",
          time: dayjs().format("HH:mm:ss"),
        }))
      );
    } catch (err) {
      console.log(err);
    }
  }, TIME_INTERVAL);
}
