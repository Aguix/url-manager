import { object, string, size, optional } from "superstruct";

export const RedirectionCreationValidator = object({
    url: size(string(), 1, 2048),
    alias: optional(size(string(), 1, 255)),
    description: optional(size(string(), 0, 512)),
});


export interface RedirectionCreation {
    userId?: number;
    url: string;
    alias?: string;
    description?: string;
}
