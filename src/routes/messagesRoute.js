import { Router } from "express";

import {
  postMessages,
  getMessages,
  deleteMessages,
} from "../controllers/messages.js";
import { validateUserHeader } from "../validations/headerUserValidation.js";

export const messagesRoute = Router();

messagesRoute.post("/messages", validateUserHeader, postMessages);
messagesRoute.get("/messages", validateUserHeader, getMessages);
messagesRoute.delete(
  "/messages/:idMessage",
  validateUserHeader,
  deleteMessages
);
