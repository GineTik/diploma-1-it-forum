import { BasicEntity } from "src/modules/basic/entities/basic.entity";
import { Post } from "src/modules/posts/entities/post.entity";

export class Tag extends BasicEntity {
    name: string;

    posts: Post[];
}
