import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/contants/routes.constants";
import { usePostsActions } from "@/hooks/posts/use-posts-actions";
import { cn } from "@/lib/utils";
import { Post } from "@/types/posts.types";
import { Check, MessageCircle, Tag, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { forwardRef } from "react";

export type QuestionItemProps = Post & {
  answersCount?: number;
  className?: string;
  haveCorrectAnswer?: boolean;
}
  
  export const QuestionItem = forwardRef<HTMLDivElement, QuestionItemProps>(
    ({ id, title, haveCorrectAnswer, answersCount = 0, tags, className }, ref) => {
      const { summarizedPostContent, summarizePost, isSummarizing, summarizeError } = usePostsActions();

      console.log(summarizedPostContent);

      return (
        <Card
          ref={ref}
          className={cn("rounded-[.5rem] mb-4 transition-all p-0 border-transparent hover:border-neutral-300 hover:dark:border-neutral-700", className)}
        >
          <CardContent className="px-4 py-3">
            <div className="flex flex-col space-y-1">
              <Link href={ROUTES.QUESTION(id)}>
                <h3 className="text-lg font-medium text-foreground hover:underline">{title}</h3>
              </Link>
              
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center">
                  {haveCorrectAnswer && (
                    <Badge 
                      variant="success"
                      className="mr-2"
                      icon={<Check size={12} />}
                    >
                      Відповідь знайдена
                    </Badge>
                  )}
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageCircle size={14} className="mr-1" />
                    <span>{answersCount} {answersCount === 1 ? "відповідь" : answersCount > 5 ? "відповідей" : "відповіді"}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 ml-auto">
                  {tags?.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      size="small"
                      className="flex items-center"
                      icon={<Tag size={10} />}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
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