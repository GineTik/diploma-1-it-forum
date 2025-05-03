import { api } from "@/lib/api";
import { getAuthHeaders } from "@/lib/get-jwt-token";
import { AuthToken } from "@/types";
import { CreateOrUpdatePostRequest } from "@/types/posts.types";

export class ArticlesServiceClass {
    public async getAll() {
        return await api.get('/posts/articles');
    }

    public async getById(id: number) {
        return await api.get(`/posts/${id}`);
    }
    
    public async create(article: CreateOrUpdatePostRequest, token: AuthToken) {
        return await api.post('/posts/articles', article, getAuthHeaders(token));
    }
}

export const ARTICLE_SERVICE = new ArticlesServiceClass();