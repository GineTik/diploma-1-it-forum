import { api } from "@/lib/api";
import { getAuthHeaders } from "@/lib/get-jwt-token";
import { AuthToken } from "@/types";
import { ArticleResponse, CreateOrUpdatePostRequest } from "@/types/posts.types";

export class ArticlesServiceClass {
    public async getAll() {
        return await api.get<ArticleResponse[]>('/posts/articles');
    }

    public async getById(id: number) {
        return await api.get(`/posts/${id}`);
    }
    
    public async create(article: CreateOrUpdatePostRequest, token: AuthToken) {
        return await api.post('/posts/articles', article, getAuthHeaders(token));
    }

    public async update(id: number, article: CreateOrUpdatePostRequest, token: AuthToken) {
        return await api.patch(`/posts/${id}`, article, getAuthHeaders(token));
    }
}

export const ARTICLE_SERVICE = new ArticlesServiceClass();