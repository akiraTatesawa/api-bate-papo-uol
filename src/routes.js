import express from "express";

import {
  getParticipants,
  postParticipants,
} from "./controllers/participants.js";
import { getMessages, postMessages } from "./controllers/messages.js";
import { postStatus } from "./controllers/status.js";

export const routes = express.Router();

routes.post("/participants", postParticipants);
routes.get("/participants", getParticipants);
routes.post("/messages", postMessages);
routes.get("/messages", getMessages);
routes.post("/status", postStatus);
