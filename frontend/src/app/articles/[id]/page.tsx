'use client'

import { ArticleAuthorPanel } from "@/components/blocks/articles/article-author-panel";
import { ArticleForm } from "@/components/blocks/articles/article-form";
import { ArticleProfile } from "@/components/blocks/articles/article-profile";
import { ArticleTagList } from "@/components/blocks/articles/article-tag-list";
import { ArticleUpdateAction } from "@/components/blocks/articles/article-update-action";
import PostFormBlock from "@/components/blocks/post-form-block";
import { LoadingButton } from "@/components/ui/loading-button";
import { PublishDates } from "@/components/ui/publish-dates";
import { StyledMarkdown } from "@/components/ui/styled-markdown/styled-markdown";
import { useArticle, useSummarizePostActions } from "@/hooks/posts";
import { ArticleResponse } from "@/types/posts.types";
import { Loader2, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ArticlePage() {
    const {id} = useParams();
    const {article, isArticleLoading} = useArticle(Number(id));
    const [isEditing, setIsEditing] = useState(false);

    if (isArticleLoading) {
        return <div className="w-full max-w-[800px] mx-auto pt-5 px-5 space-y-3">
            <div className="w-full h-[500px] flex items-center justify-center">
                <Loader2 className="size-5 animate-spin" />
            </div>
        </div>
    }

    return (
        <>
            <div className="w-full max-w-[800px] mx-auto pt-5 px-5 space-y-3">
                <ArticleAuthorPanel 
                    authorId={article.authorId} 
                    setIsEditing={setIsEditing} 
                    isEditing={isEditing} 
                    articleId={Number(id)} 
                />
                
                {isEditing
                    ? <ArticleForm 
                        action={(handleSubmit) => 
                            <ArticleUpdateAction
                                handleSubmit={handleSubmit}
                                articleId={Number(id)}
                                onSuccess={() => setIsEditing(false)} />}
                        defaultValues={article} />
                    : <Content article={article} />}
            
            </div>
            <div className="h-[50vh]"></div>
        </>
    )
}

function Content({article}: {article: ArticleResponse}) {
    const { summarizedPostContent, summarizePost, isSummarizing } = useSummarizePostActions();

    return <div className="space-y-3">
        <PostFormBlock className="space-y-3">
            <h1 className="text-2xl font-bold">{article.title}</h1>
            <div className="flex gap-2">
                <ArticleProfile authorId={article.authorId} />
                <PublishDates createdAt={article.createdAt} updatedAt={article.updatedAt} />
            </div>
            <ArticleTagList tags={article.tags} />
            <LoadingButton 
                variant="outline" 
                onClick={() => summarizePost(article.id)} 
                isLoading={isSummarizing}
            >
                <Sparkles size={12} /> Підсумувати
            </LoadingButton>
        </PostFormBlock>
        {summarizedPostContent && <PostFormBlock>
            <StyledMarkdown>{summarizedPostContent}</StyledMarkdown>
        </PostFormBlock>}
        <PostFormBlock>
            <StyledMarkdown>{article.content}</StyledMarkdown>
        </PostFormBlock>
    </div>
}