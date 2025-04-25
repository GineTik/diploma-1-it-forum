import { api } from "@/lib/api";
import { CreatePost } from "@/types/posts.types";

export class QuestionsServiceClass {
    public async getAll() {
        return await api.get('/posts/questions');
    }

    public async getOneById(id: number) {
        return await api.get(`/posts/${id}`);
    }
    
    public async create(question: CreatePost) {
        return await api.post('/posts/questions', question);
    }

    public async delete(id: number) {
        return await api.delete(`/posts/${id}`);
    }

    public async update(id: number, question: CreatePost) {
        return await api.patch(`/posts/${id}`, question);
    }
}

export const QUESTIONS_SERVICE = new QuestionsServiceClass();