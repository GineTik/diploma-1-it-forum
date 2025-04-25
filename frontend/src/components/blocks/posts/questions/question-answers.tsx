import { useAnswers } from "@/hooks/answers/use-answers";
import { Check, Loader2 } from "lucide-react";
import PostFormBlock from "../post-form-block";
import { Badge } from "@/components/ui/badge";
import { sortByCorrectAnswer } from "@/lib/sorting";
import Markdown from "react-markdown";
import { Answer } from "@/types/answers.types";
import { useAuth, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/users/use-users";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    const { user, isUserLoading, userError } = useUsers(answer.authorId);

    return (
        <PostFormBlock key={answer.id} className="space-y-4 relative">
            <div className="space-y-1 text-xs absolute top-0 right-0 p-3">
                <span className="opacity-50">Написано {parseDate(answer.createdAt)}</span>
                {!equalDates(answer.createdAt, answer.updatedAt) && <>
                    <span className="opacity-50">Оновлено {parseDate(answer.updatedAt)}</span>
                </>}
            </div>
            {answer.isCorrect && (
                <Badge variant="success">
                    <Check className="size-4" />
                    Автор позначив як правильну
                </Badge>
            )}
            <div className="flex gap-2 items-center flex-wrap">
                <Avatar className="">
                    <AvatarImage src={user.imageUrl} className="size-7 rounded-full" />
                    <AvatarFallback>
                        {user.username?.slice(0, 2)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-medium">@{user.username}</span>
                    <span className="text-xs text-muted-foreground">
                        {user.firstName} {user.lastName}
                    </span>
                </div>
                {answer.authorId === postAuthorId && (
                    <Badge variant="secondary">
                        Автор питання
                    </Badge>
                )}
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