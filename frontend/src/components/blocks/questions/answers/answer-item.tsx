import { AnswerResponse } from "@/types/answers.types";
import PostFormBlock from "../../post-form-block";
import { AnswerProfile } from "./answer-profile";
import { AnswerAuthorPanel } from "./answer-author-panel";
import { AnswerCorrectBarge } from "./answer-correct-barge";
import { useState } from "react";
import { AnswerEditableContent } from "./answer-editable-content";
import { StyledMarkdown } from "@/components/ui/styled-markdown/styled-markdown";
import { PublishDates } from "@/components/ui/publish-dates";

type AnswerItemProps = {
    answer: AnswerResponse;
    postAuthorId: string;
}

export function AnswerItem({answer, postAuthorId}: AnswerItemProps) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <PostFormBlock key={answer.id} className="relative space-y-4">
            
            <AnswerCorrectBarge isCorrect={answer.isCorrect} />
            {isEditing
                ? <AnswerEditableContent answerId={answer.id} content={answer.content} setIsEditing={setIsEditing} />
                : <StyledMarkdown>{answer.content}</StyledMarkdown>}
            
            <div className="flex gap-2 items-center flex-wrap">
                <AnswerProfile authorId={answer.authorId} postAuthorId={postAuthorId} />
                <AnswerAuthorPanel authorId={answer.authorId} answerId={answer.id} setIsEditing={setIsEditing} isEditing={isEditing} />
                <PublishDates createdAt={answer.createdAt} updatedAt={answer.updatedAt} className="ml-auto" />
            </div>

        </PostFormBlock>
    )
}