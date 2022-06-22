import joi from "joi";

export const participantSchema = joi.object({
  name: joi.string().min(1).required(),
});

export const messageSchema = joi.object({
  to: joi.string().min(1).required(),
  text: joi.string().min(1).required(),
  type: joi.string().valid("message", "private_message").required(),
});
