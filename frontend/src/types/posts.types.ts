import { z } from "zod";
import { TagResponse, tagSchema } from "./tags.type";

export type CreateOrUpdatePostRequest = {
    title: string;
    content: string;
    tags: number[];
}

export type PostResponse = {
    id: number;
    title: string;
    content: string;
    tags: TagResponse[];
    authorId: string;
}

export const questionSchema = z.object({
    title: z.string().min(1, 'Назва є обов\'язковим полем').max(200, 'Назва є занадто довгою'),
    contentProblem: z.string().min(1, 'Опис проблеми є обов\'язковим полем'),
    contentTried: z.string().optional(),
    tags: z.array(tagSchema)
        .min(1, 'Необхідно додати хоча б один тег, але не більше 5-ти')
        .max(5, 'Необхідно додати не більше 5-ти тегів')
});

export type QuestionFormData = z.infer<typeof questionSchema>;