import { api } from "@/lib/api";
import { getAuthHeaders } from "@/lib/get-jwt-token";
import { AuthToken } from "@/types/auth.types";
import { AnswerRequest, AnswerResponse } from "@/types/answers.types";

export class AnswersServiceClass {
    public async getAllByPostId(postId: number): Promise<AnswerResponse[]> {
        return await api.get(`posts/${postId}/answers`);
    }

    public async create(postId: number, answer: AnswerRequest, token: AuthToken): Promise<AnswerResponse> {
        return await api.post(`answers`, { ...answer, postId }, getAuthHeaders(token));
    }

    public async update(answerId: number, answer: AnswerRequest, token: AuthToken): Promise<AnswerResponse> {
        return await api.patch(`answers/${answerId}`, answer, getAuthHeaders(token));
    }

    public async delete(answerId: number, token: AuthToken): Promise<void> {
        return await api.delete(`answers/${answerId}`, getAuthHeaders(token));
    }
}

export const ANSWERS_SERVICE = new AnswersServiceClass();