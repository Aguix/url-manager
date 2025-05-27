import { getUserFromToken } from "~/utils/getUserFromToken";

export default defineEventHandler(async (event) => {
    return await getUserFromToken(event);
})