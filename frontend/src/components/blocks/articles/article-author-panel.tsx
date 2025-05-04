import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { useDeleteArticles } from "@/hooks/posts/use-delete-articles";
import { useAuth } from "@clerk/nextjs";
import { Edit, Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type ArticleAuthorPanelProps = {
    authorId: string;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    isEditing: boolean;
    articleId: number;
}

export function ArticleAuthorPanel({authorId, setIsEditing, isEditing, articleId}: ArticleAuthorPanelProps) {
    const {deleteArticle, isDeletePending, isDeleteSuccess} = useDeleteArticles(articleId)

    const {userId} = useAuth()
    if (authorId !== userId) {
        return <></>
    }

    return (
        <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="default" onClick={() => setIsEditing(state => !state)}>
                {isEditing ? "Назад" : <><Edit /> Ред.</>}
            </Button>
            <LoadingButton 
                variant="destructive"
                onClick={() => deleteArticle()}
                isLoading={isDeletePending || isDeleteSuccess}
            >
                <Trash /> Удалить
            </LoadingButton>
        </div>
    )
}