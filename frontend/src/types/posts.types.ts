import { TagResponse } from "./tags.type";

export type CreateOrUpdatePostRequest = {
    title: string;
    content: string;
    tags: number[];
}

export type PostResponse = {
    id: number;
    title: string;
    content: string;
    tags: TagResponse[];
    authorId: string;
}