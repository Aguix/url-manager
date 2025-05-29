import { object, string, size } from "superstruct";

export const AliasValidator = object({
    alias: size(string(), 1, 255),
});