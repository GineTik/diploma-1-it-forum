import { z } from "zod";

export type TagResponse = z.infer<typeof tagSchema>;

export const tagSchema = z.object({
    id: z.number(),
    name: z.string()
});

export const createTagSchema = z.object({
    name: z.string().min(1, { message: "Назва тегу є обов'язковою" }),
});

export type CreateTagRequest = z.infer<typeof createTagSchema>;