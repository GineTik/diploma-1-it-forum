import { BasicEntity } from "src/modules/basic/entities/basic.entity";

export class Answer extends BasicEntity {
    content: string;

    postId: number;

    authorId: number;
}
