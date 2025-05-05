import { CreateTagRequest, TagResponse } from "@/types/tags.type";
import { api } from "../lib/api";
import { AuthToken } from "@/types";
import { getAuthHeaders } from "@/lib/get-jwt-token";

export class TagsServiceClass {
    public async getAll() {
        return await api.get<TagResponse[]>('/tags');
    }

    public async recommend(title: string, content: string) {
        return await api.get<TagResponse[]>(`/tags/ai/recommend?title=${title}&content=${content}`);
    }

    public async delete(id: number, token: AuthToken) {
        return await api.delete(`/tags/${id}`, getAuthHeaders(token));
    }

    public async create(tags: CreateTagRequest, token: AuthToken) {
        return await api.post('/tags', tags, getAuthHeaders(token));
    }
}

export const TAGS_SERVICE = new TagsServiceClass();