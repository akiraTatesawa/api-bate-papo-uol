import express from "express";

import {
  getParticipants,
  postParticipants,
} from "./controllers/participants.js";
import { getMessages, postMessages } from "./controllers/messages.js";
import { postStatus } from "./controllers/status.js";
import { validateUserHeader } from "./validations/headerUserValidation.js";

export const routes = express.Router();

routes.post("/participants", postParticipants);
routes.get("/participants", getParticipants);
routes.post("/messages", validateUserHeader, postMessages);
routes.get("/messages", validateUserHeader, getMessages);
routes.post("/status", validateUserHeader, postStatus);
