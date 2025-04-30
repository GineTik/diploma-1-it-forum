import { useAnswers } from "@/hooks/answers/use-answers";
import { Check, Edit, Loader2, Trash } from "lucide-react";
import PostFormBlock from "../post-form-block";
import { Badge } from "@/components/ui/badge";
import { sortByCorrectAnswer } from "@/lib/sorting";
import Markdown from "react-markdown";
import { AnswerResponse } from "@/types/answers.types";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/users/use-users";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteAnswer } from "@/hooks/answers/use-answers-actions";

type QuestionAuthorPanelProps = {
    postId: number;
    authorId: string;
}

export default function QuestionAnswers({postId, authorId}: QuestionAuthorPanelProps) {
    const { answers, isAnswersLoading } = useAnswers(postId);
 
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
    answer: AnswerResponse;
    postAuthorId: string;
}

function AnswerItem({answer, postAuthorId}: AnswerItemProps) {
    return (
        <PostFormBlock key={answer.id} className="relative space-y-4">
            {answer.isCorrect && (
                <Badge variant="success">
                    <Check className="size-4" />
                    Автор позначив як правильну
                </Badge>
            )}
            <Markdown>{answer.content}</Markdown>
            <div className="text-xs absolute bottom-0 right-0 p-3 mb-0">
                <span className="opacity-50 ml-auto">Написано {parseDate(answer.createdAt)}</span>
                {!equalDates(answer.createdAt, answer.updatedAt) && <>
                    <span className="opacity-50">Оновлено {parseDate(answer.updatedAt)}</span>
                </>}
            </div>
            <div className="flex gap-2 items-center">
                <AnswerProfile authorId={answer.authorId} postAuthorId={postAuthorId} />
                <AnswerAuthorPanel authorId={answer.authorId} answerId={answer.id} />
            </div>
        </PostFormBlock>
    )
}

type AnswerAuthorPanelProps = {
    authorId: string;
    answerId: number;
}

function AnswerAuthorPanel({authorId, answerId}: AnswerAuthorPanelProps) {
    const {userId} = useAuth()
    const {deleteAnswer, isDeletingAnswer} = useDeleteAnswer(answerId)
    if (authorId !== userId) {
        return <></>
    }

    return (
        <div className="flex flex-wrap gap-2 justify-end">
            <Button variant="outline" size="sm">
                <Edit /> Ред.
            </Button>
            <Button variant="destructive" size="icon" onClick={() => deleteAnswer()}>
                {isDeletingAnswer ? <Loader2 className="size-4 animate-spin" /> : <Trash className="size-4" />}
            </Button>
        </div>
    )
}

function AnswerProfile({authorId, postAuthorId}: {authorId: string, postAuthorId: string}) {
    const { user, isUserLoading } = useUsers(authorId);

    if (isUserLoading)
        return <Skeleton className="size-7 rounded-full animate-pulse" />

    return (<div className="flex gap-2 items-center">
        <Avatar className="">
            <AvatarImage src={user?.imageUrl} className="size-7 rounded-full" />
            <AvatarFallback>
                {user?.username?.slice(0, 2)}
            </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
            <span className="text-sm font-medium">@{user?.username}</span>
            <span className="text-xs text-muted-foreground">
                {user?.firstName} {user?.lastName}
            </span>
        </div>
        {authorId === postAuthorId && (
            <Badge variant="secondary">
                Автор питання
            </Badge>
        )}
    </div>)
}

function parseDate(date: string) {
    return new Date(date).toLocaleDateString();
}

function equalDates(date1: string, date2: string) {
    return parseDate(date1) === parseDate(date2);
}