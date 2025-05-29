import { object, string, size, optional, number } from "superstruct";

export const RedirectionCreationValidator = object({
    userId : number(),
    url: size(string(), 1, 2048),
    alias: optional(size(string(), 1, 255)),
    description: optional(size(string(), 0, 512)),
});