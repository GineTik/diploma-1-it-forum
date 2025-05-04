import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { Edit } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type ArticleAuthorPanelProps = {
    authorId: string;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    isEditing: boolean;
}

export function ArticleAuthorPanel({authorId, setIsEditing, isEditing}: ArticleAuthorPanelProps) {
    const {userId} = useAuth()
    if (authorId !== userId) {
        return <></>
    }

    return (
        <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="default" onClick={() => setIsEditing(state => !state)}>
                {isEditing ? "Назад" : <><Edit /> Ред.</>}
            </Button>
        </div>
    )
}