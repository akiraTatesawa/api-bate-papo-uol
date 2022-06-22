import { Router } from "express";

import {
  postParticipants,
  getParticipants,
} from "../controllers/participants.js";

export const participantsRoute = Router();

participantsRoute.post("/participants", postParticipants);
participantsRoute.get("/participants", getParticipants);
