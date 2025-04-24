import { Expose } from "class-transformer";
import { Tag } from "generated/prisma";

export class GetQuestionDto {
    @Expose()
    id: number;

    @Expose()
    title: string;
    
    @Expose()
    content: string;
    
    @Expose()
    createdAt: Date;
    
    @Expose()
    updatedAt: Date;
    
    @Expose()
    authorId: string;
    
    @Expose()
    postId: number;
    
    @Expose()
    haveCorrectAnswer: boolean;

    @Expose()
    answersCount: number;

    @Expose()
    tags: Tag[];
}