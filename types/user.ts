import { object, string, size, refine } from "superstruct";
import validator from 'validator';

export const UserCreationValidator = object({
    email: refine(string(), 'Email', (value) => validator.isEmail(value)),
    username: size(string(), 1, 255),
    password: string(),
});