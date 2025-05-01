import { z } from "zod";

export type TagResponse = z.infer<typeof tagSchema>;

export const tagSchema = z.object({
    id: z.number(),
    name: z.string()
});