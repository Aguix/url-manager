import { object, string, refine } from "superstruct";
import validator from 'validator';

export const EmailCheckValidator = object({
    email: refine(string(), 'Email', (value) => validator.isEmail(value)),
});