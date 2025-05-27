import { object, string, refine, size } from "superstruct";
import validator from 'validator';

export const EmailCheckValidator = object({
    email: refine(string(), 'Email', (value) => validator.isEmail(value)),
});

export const EmailCodeValidator = object({
    email: refine(string(), 'Email', (value) => validator.isEmail(value)),
    code: size(string(), 6, 6),
});