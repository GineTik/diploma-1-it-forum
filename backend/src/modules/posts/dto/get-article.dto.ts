import { Tag } from "generated/prisma";

export class GetArticleDto {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    tags: Tag[];
}