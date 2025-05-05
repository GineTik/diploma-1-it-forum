import { LoadingButton } from "@/components/ui/loading-button";
import { useDeleteTag } from "@/hooks/tags/use-delete-tags";
import { useAuth } from "@clerk/nextjs";
import { Trash } from "lucide-react";

type TagsDeleteActionProps = {
    id: number;
}

export function TagsDeleteAction({id}: TagsDeleteActionProps) {
    const {deleteTag, isDeletePending} = useDeleteTag();

    const {isSignedIn} = useAuth()

    if (!isSignedIn) 
        return <></>;

    return (
        <LoadingButton 
            variant="destructiveTextOnHover" 
            size="iconSm" 
            onClick={() => deleteTag(id)} 
            isLoading={isDeletePending}
        >
            <Trash className="size-4" />
        </LoadingButton>
    )
}