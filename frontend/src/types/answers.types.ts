import { z } from "zod";

export type AnswerRequest = {
    content: string;
    questionId: string;
}

export type AnswerResponse = {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    isCorrect: boolean;
}

export const AnswerRequestSchema = z.object({
    content: z.string(),
    questionId: z.string(),
});