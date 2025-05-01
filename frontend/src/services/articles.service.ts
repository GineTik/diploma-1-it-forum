import { api } from "@/lib/api";
import { getAuthHeaders } from "@/lib/get-jwt-token";
import { CreateOrUpdatePostRequest } from "@/types/posts.types";

export class ArticlesServiceClass {
    public async getAllArticles() {
        return await api.get('/posts/articles');
    }

    public async getArticleById(id: number) {
        return await api.get(`/posts/${id}`);
    }
    
    public async createArticle(article: CreateOrUpdatePostRequest, token: string) {
        return await api.post('/posts/articles', article, getAuthHeaders(token));
    }
}

export const ARTICLE_SERVICE = new ArticlesServiceClass();