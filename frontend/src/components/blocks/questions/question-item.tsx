'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/contants/routes.constants";
import { useSummarizePostActions } from "@/hooks/posts/use-posts-actions";
import { cn } from "@/lib/utils";
import { PostResponse } from "@/types/posts.types";
import { TagResponse } from "@/types/tags.type";
import { Check, MessageCircle, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { forwardRef } from "react";
import { TagItem } from "../tag-item";

export type QuestionItemProps = PostResponse & {
  answersCount?: number;
  className?: string;
  haveCorrectAnswer?: boolean;
}
  
export const QuestionItem = forwardRef<HTMLDivElement, QuestionItemProps>(
  ({ id, title, haveCorrectAnswer, answersCount = 0, tags, className }, ref) => {
    const { summarizedPostContent, summarizePost, isSummarizing } = useSummarizePostActions();

    return (
      <Card
        ref={ref}
        className={cn("rounded-[.5rem] mb-4 transition-all p-0 border-transparent hover:border-neutral-300 hover:dark:border-neutral-700", className)}
      >
        <CardContent className="px-4 py-3">
          <div className="flex flex-col space-y-1">
            <Title title={title} id={id} />
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center">
                <HaveCorrectAnswerBadge haveCorrectAnswer={haveCorrectAnswer} />
                <MessageCount answersCount={answersCount} />
              </div>
              
              <Tags tags={tags} />
              <Button variant="outline" onClick={() => summarizePost(id)}>
                {isSummarizing ? <Loader2 className="animate-spin" size={12} /> : <Sparkles size={12} />}
                Підсумувати
              </Button>
            </div>

            {summarizedPostContent && <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Model: Mistral 7B Instruct</p>
              <p>{summarizedPostContent}</p>
            </div>}

          </div>
        </CardContent>
      </Card>
    );
  }
);

QuestionItem.displayName = "QuestionItem";

function Title({ title, id }: { title: string, id: number }) {
  return (
    <Link href={ROUTES.QUESTION(id)}>
      <h3 className="text-lg font-medium text-foreground hover:underline">{title}</h3>
    </Link>
  )
}

function HaveCorrectAnswerBadge({ haveCorrectAnswer }: { haveCorrectAnswer: boolean | undefined }) {
  if (!haveCorrectAnswer)
    return <></>

  return (
    <Badge variant="success" className="mr-2" icon={<Check size={12} />}>
      Відповідь знайдена
    </Badge>
  )
}

function Tags({ tags }: { tags: TagResponse[] }) {
  return (
    <div className="flex flex-wrap gap-1 ml-auto">
      {tags?.map((tag, index) => (
        <TagItem key={index} name={tag.name} />
      ))}
    </div>
  )
}

function MessageCount({ answersCount }: { answersCount: number }) {
  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <MessageCircle size={14} className="mr-1" />
      <span>{answersCount} {answersCount === 1 ? "відповідь" : answersCount > 5 ? "відповідей" : "відповіді"}</span>
    </div>
  )
}