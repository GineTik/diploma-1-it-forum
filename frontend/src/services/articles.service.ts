import { api } from "@/lib/api";
import { CreatePost } from "@/types/posts.types";

export class ArticlesServiceClass {
    public async getAllArticles() {
        return await api.get('/posts/articles');
    }

    public async getArticleById(id: number) {
        return await api.get(`/posts/${id}`);
    }
    
    public async createArticle(article: CreatePost) {
        return await api.post('/posts/articles', article);
    }
}

export const ARTICLE_SERVICE = new ArticlesServiceClass();