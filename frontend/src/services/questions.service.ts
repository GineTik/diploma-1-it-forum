import { api } from "@/lib/api";
import { getAuthHeaders } from "@/lib/get-jwt-token";
import { AuthToken } from "@/types/auth.types";
import { CreateOrUpdatePostRequest, FilterPostParameters } from "@/types/posts.types";

export class QuestionsServiceClass {
    public async getAll() {
        return await api.get('/posts/questions');
    }

    public async getFiltered(filter: FilterPostParameters) {
        return await api.get('/posts/questions', {params: filter});
    }

    public async getOneById(id: number) {
        return await api.get(`/posts/${id}`);
    }
    
    public async create(question: CreateOrUpdatePostRequest, token: AuthToken) {
        return await api.post('/posts/questions', question, getAuthHeaders(token))
    }

    public async delete(id: number, token: AuthToken) {
        return await api.delete(`/posts/${id}`, getAuthHeaders(token));
    }

    public async update(id: number, question: CreateOrUpdatePostRequest, token: AuthToken) {
        return await api.patch(`/posts/${id}`, question, getAuthHeaders(token));
    }
}

export const QUESTIONS_SERVICE = new QuestionsServiceClass();