import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/contants/routes.constants";
import { cn } from "@/lib/utils";
import { TagResponse } from "@/types/tags.type";
import { TagIcon } from "lucide-react";
import Link from "next/link";
import { forwardRef } from "react";
import { ArticleProfile } from "./article-profile";

export type ArticleItemProps = {
  title: string;
  tags: TagResponse[];
  className?: string;
  id: number;
  authorId: string;
}
  
export const ArticleItem = forwardRef<HTMLDivElement, ArticleItemProps>(
({ title, tags, className, id, authorId }, ref) => {
    return (
    <Card
        ref={ref}
        className={cn("w-[300px] rounded-[.5rem] mb-4 transition-all p-0 border-transparent cursor-pointer hover:border-neutral-300 hover:dark:border-neutral-700", className)}
    >
        <CardContent className="px-4 py-3">
        <div className="flex flex-col space-y-2">
            <ArticleProfile authorId={authorId} />

            <Title title={title} id={id} />
        
            <div className="flex flex-wrap gap-1">
                {tags?.map((tag, index) => (
                    <Badge 
                        key={index} 
                        variant="secondary"
                        size="small"
                        className="flex items-center"
                        icon={<TagIcon size={10} />}
                    >
                        {tag.name}
                    </Badge>
                ))}
            </div>
        </div>
        </CardContent>
    </Card>
    );
});

ArticleItem.displayName = "ArticleItem";

function Title({ title, id }: { title: string, id: number }) {
    return (
      <Link href={ROUTES.ARTICLE(id)}>
        <h3 className="text-lg font-medium text-foreground hover:underline">{title}</h3>
      </Link>
    )
  }