import { api } from "@/lib/api";
import { Answer } from "@/types/answers.types";

export class AnswersServiceClass {
    public async getAllByPostId(postId: number): Promise<Answer[]> {
        return await api.get(`posts/${postId}/answers`);
    }

    public async create(postId: number, content: string): Promise<Answer> {
        return await api.post(`answers`, { content, postId });
    }

    public async update(answerId: number, content: string): Promise<Answer> {
        return await api.patch(`answers/${answerId}`, { content });
    }

    public async delete(answerId: number): Promise<void> {
        return await api.delete(`answers/${answerId}`);
    }
}

export const ANSWERS_SERVICE = new AnswersServiceClass();