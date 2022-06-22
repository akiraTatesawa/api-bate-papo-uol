import { Router } from "express";

import { postStatus } from "../controllers/status.js";
import { validateUserHeader } from "../validations/headerUserValidation.js";

export const statusRoute = Router();

statusRoute.post("/status", validateUserHeader, postStatus);
