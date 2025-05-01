'use client';

import PostFormBlock from "@/components/blocks/post-form-block";
import { useQuestion } from "@/hooks/posts/use-questions";
import { useParams } from "next/navigation";
import Markdown from 'react-markdown';
import styles from './page.module.scss';
import { Loader2, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import QuestionAuthorPanel from "@/components/blocks/questions/item/question-author-panel";
import AnswerList from "@/components/blocks/questions/answers/answer-list";
import AnswerForm from "@/components/blocks/questions/answers/answer-form";
import { PostResponse } from "@/types/posts.types";

export default function QuestionPage() {
    const {id} = useParams();
    const {post, isPostLoading} = useQuestion(Number(id));

    if (isPostLoading) {
        return <div className="w-full max-w-[800px] mx-auto pt-5 px-5 space-y-3">
            <div className="w-full h-[500px] flex items-center justify-center">
                <Loader2 className="size-5 animate-spin" />
            </div>
        </div>
    }

    return (
        <div className="w-full max-w-[800px] mx-auto pt-5 px-5 space-y-3">
            <QuestionAuthorPanel postId={post.id} authorId={post.authorId} />
            <Content post={post} />
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
        <div className={styles.markdown}>
            <Markdown>
                {post.content}
            </Markdown>
        </div>    
    </PostFormBlock>
}

function TagItem({ name }: { name: string }) {
    return <Badge variant="secondary">
        <Tag className="size-4" />
        {name}
    </Badge>
}