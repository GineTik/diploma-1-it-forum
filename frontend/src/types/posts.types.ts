import { z } from "zod";
import { TagResponse, tagSchema } from "./tags.type";
import { FieldErrors, UseFormRegister } from "react-hook-form";

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

export const createQuestionSchema = z.object({
    title: z.string().min(1, 'Назва є обов\'язковим полем').max(200, 'Назва є занадто довгою'),
    contentProblem: z.string().min(1, 'Опис проблеми є обов\'язковим полем'),
    contentTried: z.string().optional(),
    tags: z.array(tagSchema)
        .min(1, 'Необхідно додати хоча б один тег, але не більше 5-ти')
        .max(5, 'Необхідно додати не більше 5-ти тегів')
});

export const updateQuestionSchema = z.object({
    title: z.string().min(1, 'Назва є обов\'язковим полем').max(200, 'Назва є занадто довгою'),
    content: z.string().min(1, 'Опис є обов\'язковим полем'),
    tags: z.array(tagSchema)
        .min(1, 'Необхідно додати хоча б один тег, але не більше 5-ти')
        .max(5, 'Необхідно додати не більше 5-ти тегів')
});

export type QuestionFormData = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionFormData = z.infer<typeof updateQuestionSchema>;

export type CreateOrUpdateFormRegister = UseFormRegister<QuestionFormData | UpdateQuestionFormData>
export type CreateOrUpdateFieldErrors = FieldErrors<QuestionFormData | UpdateQuestionFormData>

export type FilterPostParameters = {
    userId?: string | null;
}

export const createOrUpdateArticleSchema = z.object({
    title: z.string().min(1, 'Назва є обов\'язковим полем').max(200, 'Назва є занадто довгою'),
    content: z.string().min(1, 'Опис є обов\'язковим полем'),
    tags: z.array(tagSchema)
        .min(1, 'Необхідно додати хоча б один тег, але не більше 5-ти')
        .max(5, 'Необхідно додати не більше 5-ти тегів')
});

export type CreateOrUpdateArticleFormData = z.infer<typeof createOrUpdateArticleSchema>;