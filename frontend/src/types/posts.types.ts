import { Tag } from "./tags.type";

export type CreatePost = {
    title: string;
    content: string;
    tags: number[];
}

export type Post = {
    id: number;
    title: string;
    content: string;
    tags: Tag[];
    authorId: string;
}