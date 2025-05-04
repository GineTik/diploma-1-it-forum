import { TagResponse } from "@/types";
import { TagItem } from "../tag-item";

export function ArticleTagList({tags}: {tags: TagResponse[]}) {
    return <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
            <TagItem key={tag.id} name={tag.name} />
        ))}
    </div>
}