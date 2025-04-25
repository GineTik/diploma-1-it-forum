import { useAnswers } from "@/hooks/answers/use-answers";
import { Check, Loader2 } from "lucide-react";
import PostFormBlock from "../post-form-block";
import { Badge } from "@/components/ui/badge";
import { sortByCorrectAnswer } from "@/lib/sorting";
import Markdown from "react-markdown";
import { Answer } from "@/types/answers.types";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

type QuestionAuthorPanelProps = {
    postId: number;
    authorId: string;
}

export default function QuestionAnswers({postId, authorId}: QuestionAuthorPanelProps) {
    const { answers, isAnswersLoading, answersError } = useAnswers(postId);
 
    return (
        <div className="space-y-2">
            <h3 className="text-xl">Відповіді ({answers?.length})</h3>
            {isAnswersLoading ? (
                <Loader2 className="size-5 animate-spin mx-auto" />
            ) : (
                answers?.sort(sortByCorrectAnswer).map((answer) => (
                    <AnswerItem 
                        key={answer.id} 
                        answer={answer}
                        postAuthorId={authorId}
                    />
                ))
            )}

            {answers?.length === 0 && (
                <p className="text-center text-muted-foreground">Ще немає відповідей</p>
            )}
        </div>
    )
}

type AnswerItemProps = {
    answer: Answer;
    postAuthorId: string;
}

function AnswerItem({answer, postAuthorId}: AnswerItemProps) {
    return (
        <PostFormBlock key={answer.id} className="">
            <div className="flex flex-wrap gap-2">
                {answer.isCorrect && (
                    <Badge variant="success">
                        <Check className="size-4" />
                        Автор позначив як правильну
                    </Badge>
                )}
                {answer.authorId === postAuthorId && (
                    <Badge variant="secondary">
                        Автор питання
                    </Badge>
                )}
                <div className="flex gap-2 ml-auto text-xs">
                    <span className="opacity-50">Написано {parseDate(answer.createdAt)}</span>
                    {!equalDates(answer.createdAt, answer.updatedAt) && <>
                        <span className="opacity-50">Оновлено {parseDate(answer.updatedAt)}</span>
                    </>}
                </div>
            </div>
            <Markdown>{answer.content}</Markdown>
            <AnswerAuthorPanel authorId={answer.authorId} />
        </PostFormBlock>
    )
}

function AnswerAuthorPanel({authorId}: {authorId: string}) {
    const {userId} = useAuth()

    if (authorId !== userId) {
        return <></>
    }

    return (
        <div className="flex flex-wrap gap-2 mt-5">
            <Button variant="outline" size="sm">
                Редагувати
            </Button>
            <Button variant="destructive" size="sm">
                Видалити
            </Button>
        </div>
    )
}

function parseDate(date: string) {
    return new Date(date).toLocaleDateString();
}

function equalDates(date1: string, date2: string) {
    return parseDate(date1) === parseDate(date2);
}