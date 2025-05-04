'use client';

import PostFormBlock from "@/components/blocks/post-form-block";
import { useQuestion } from "@/hooks/posts/use-questions";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import QuestionAuthorPanel from "@/components/blocks/questions/item/question-author-panel";
import AnswerList from "@/components/blocks/questions/answers/answer-list";
import AnswerForm from "@/components/blocks/questions/answers/answer-form";
import { PostResponse } from "@/types/posts.types";
import { QuestionEditableContent } from "@/components/blocks/questions/form/question-editable-content";
import { useState } from "react";
import { TagItem } from "@/components/blocks/tag-item";
import { StyledMarkdown } from "@/components/ui/styled-markdown/styled-markdown";

export default function QuestionPage() {
    const {id} = useParams();
    const {post, isPostLoading} = useQuestion(Number(id));
    const [isEditing, setIsEditing] = useState(false);

    if (isPostLoading) {
        return <div className="w-full max-w-[800px] mx-auto pt-5 px-5 space-y-3">
            <div className="w-full h-[500px] flex items-center justify-center">
                <Loader2 className="size-5 animate-spin" />
            </div>
        </div>
    }

    return (
        <div className="w-full max-w-[800px] mx-auto pt-5 px-5 space-y-3">
        
            <QuestionAuthorPanel postId={post.id} authorId={post.authorId} isEditing={isEditing} setIsEditing={setIsEditing} />
            
            {isEditing
                ? <QuestionEditableContent post={post} setIsEditing={setIsEditing} />
                : <Content post={post} />}
            
            <AnswerForm postId={post.id} />
            <AnswerList postId={post.id} authorId={post.authorId} />
        
        </div>
    )
}

function Content({post}: {post: PostResponse}) {
    return <PostFormBlock className="p-5">
        <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => <TagItem key={tag.id} name={tag.name} />)}
        </div>
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <StyledMarkdown>
            {post.content}
        </StyledMarkdown>
    </PostFormBlock>
}