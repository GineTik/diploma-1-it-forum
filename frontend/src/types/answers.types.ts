import { z } from "zod";

export type AnswerRequest = {
    content: string;
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
    content: z.string()
        .min(1, {message: "Відповідь не може бути порожньою"}),
});