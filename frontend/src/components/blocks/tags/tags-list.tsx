import { useTags } from "@/hooks/tags/use-tags";
import { TagItem } from "../tag-item";
import { TagsDeleteAction } from "./tags-delete-action";
import { TagsCreateForm } from "./tags-create-form";

export function TagsList() {
    const {tags} = useTags();

    return (
        <div className="space-y-4">
            <TagsCreateForm />
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                {tags.map((tag) => (
                    <TagItem 
                        key={tag.id}
                        name={tag.name}
                        actions={<TagsDeleteAction id={tag.id} />} />
                ))}
            </div>        
        </div>
    )
}