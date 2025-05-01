import { api } from "@/lib/api";
import { getAuthHeaders } from "@/lib/get-jwt-token";
import { AnswerResponse } from "@/types/answers.types";
import { AuthToken } from "@/types/auth.types";
import { CreateOrUpdatePostRequest, PostResponse } from "@/types/posts.types";

export class PostsServiceClass {
    public async summarize(postId: number, token: AuthToken): Promise<AnswerResponse[]> {
        return await api.get(`posts/${postId}/ai/excerpt`, getAuthHeaders(token));
    }

    public async update(postId: number, post: CreateOrUpdatePostRequest, token: AuthToken): Promise<PostResponse> {
        return await api.patch(`posts/${postId}`, post, getAuthHeaders(token));
    }

    public async delete(postId: number, token: AuthToken): Promise<void> {
        return await api.delete(`posts/${postId}`, getAuthHeaders(token));
    }
}

export const POSTS_SERVICE = new PostsServiceClass();