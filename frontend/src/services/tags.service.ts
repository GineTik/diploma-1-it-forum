import { TagResponse } from "@/types/tags.type";
import { api } from "../lib/api";

export class TagsServiceClass {
    public async getAll() {
        return await api.get<TagResponse[]>('/tags');
    }

    public async recommend(title: string, content: string) {
        return await api.get<TagResponse[]>(`/tags/ai/recommend?title=${title}&content=${content}`);
    }
}

export const TAGS_SERVICE = new TagsServiceClass();