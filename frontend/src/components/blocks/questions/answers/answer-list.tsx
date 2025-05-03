import { useAnswers } from "@/hooks/answers";
import { Loader2 } from "lucide-react";
import { sortByCorrectAnswer } from "@/lib/sorting";
import { AnswerItem } from "./answer-item";

type AnswerListProps = {
    postId: number;
    authorId: string;
}

export default function AnswerList({postId, authorId}: AnswerListProps) {
    const { answers, isAnswersLoading } = useAnswers(postId);
 
    return (
        <div className="space-y-2">
            <h3 className="text-xl">Відповіді ({answers?.length})</h3>

            {isAnswersLoading && <Loader2 className="size-5 animate-spin mx-auto" />}

            {!isAnswersLoading && answers?.sort(sortByCorrectAnswer).map((answer) => (
                <AnswerItem 
                    key={answer.id} 
                    answer={answer}
                    postAuthorId={authorId}
                />
            ))}

            {answers?.length === 0 && (
                <p className="text-center text-muted-foreground">Ще немає відповідей</p>
            )}
        </div>
    )
}