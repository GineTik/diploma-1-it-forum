import { api } from "@/lib/api";
import { getAuthHeaders } from "@/lib/get-jwt-token";
import { AnswerResponse } from "@/types/answers.types";

export class PostsServiceClass {
    public async summarizePost(postId: number, token: string | null): Promise<AnswerResponse[]> {
        return await api.get(`posts/${postId}/ai/excerpt`, getAuthHeaders(token));
    }
}

export const POSTS_SERVICE = new PostsServiceClass();