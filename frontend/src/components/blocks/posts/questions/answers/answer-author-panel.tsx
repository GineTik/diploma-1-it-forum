import { Button } from "@/components/ui/button";
import { useDeleteAnswer } from "@/hooks/answers/use-answers-actions";
import { useAuth } from "@clerk/nextjs";
import { Edit, Loader2, Trash } from "lucide-react";

type AnswerAuthorPanelProps = {
    authorId: string;
    answerId: number;
}

export function AnswerAuthorPanel({authorId, answerId}: AnswerAuthorPanelProps) {
    const {userId} = useAuth()
    const {deleteAnswer, isDeletingAnswer} = useDeleteAnswer(answerId)
    if (authorId !== userId) {
        return <></>
    }

    return (
        <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="default">
                <Edit /> Ред.
            </Button>
            <Button variant="destructive" size="icon" onClick={() => deleteAnswer()}>
                {isDeletingAnswer ? <Loader2 className="size-4 animate-spin" /> : <Trash className="size-4" />}
            </Button>
        </div>
    )
}