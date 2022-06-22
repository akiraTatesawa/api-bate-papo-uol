import { Router } from "express";

import { postMessages, getMessages } from "../controllers/messages.js";

import { validateUserHeader } from "../validations/headerUserValidation.js";

export const messagesRoute = Router();

messagesRoute.post("/messages", validateUserHeader, postMessages);
messagesRoute.get("/messages", validateUserHeader, getMessages);
