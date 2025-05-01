import { Button } from "@/components/ui/button";
import { useDeletePost } from "@/hooks/posts/use-posts-actions";
import { useAuth } from "@clerk/nextjs";
import { Loader2, Pencil, Trash } from "lucide-react";

type QuestionAuthorPanelProps = {
    postId: number;
    authorId: string;
}

export default function QuestionAuthorPanel({postId, authorId}: QuestionAuthorPanelProps) {
    const {userId} = useAuth();
    const {deletePost, isDeletingPost} = useDeletePost(postId);

    if (userId != authorId)
        return <></>;

    return (
        <div className="flex justify-end gap-1">
            <Button variant="outline">
                <Pencil className="size-4" />
                Редагувати
            </Button>
            <Button variant="destructive" onClick={() => deletePost()} disabled={isDeletingPost}>
                {isDeletingPost ? <Loader2 className="size-4 animate-spin" /> : <Trash className="size-4" />}
                Видалити
            </Button>
        </div>
    )
}