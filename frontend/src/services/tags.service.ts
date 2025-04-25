import { Tag } from "@/types/tags.type";
import { api } from "../lib/api";

export class TagsServiceClass {
    public async getAll() {
        return await api.get<Tag[]>('/tags');
    }

    public async recommend(title: string, content: string) {
        return await api.get<Tag[]>(`/tags/ai/recommend?title=${title}&content=${content}`);
    }
}

export const TagsService = new TagsServiceClass();