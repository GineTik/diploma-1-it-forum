import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TagResponse } from "@/types/tags.type";
import { MessageCircle, TagIcon } from "lucide-react";
import { forwardRef } from "react";

export type ArticleItemProps = {
  title: string;
  tags: TagResponse[];
  className?: string;
}
  
export const ArticleItem = forwardRef<HTMLDivElement, ArticleItemProps>(
({ title, tags, className }, ref) => {
    return (
    <Card
        ref={ref}
        className={cn("w-[300px] rounded-[.5rem] mb-4 transition-all p-0 border-transparent cursor-pointer hover:border-neutral-300 hover:dark:border-neutral-700", className)}
    >
        <CardContent className="px-4 py-3">
        <div className="flex flex-col space-y-1">
            <h3 className="text-lg font-medium text-foreground">{title}</h3>
            
            <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                    <MessageCircle size={14} className="mr-1" />
                </div>
            </div>
            
            <div className="flex flex-wrap gap-1 ml-auto">
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
        </div>
        </CardContent>
    </Card>
    );
});

ArticleItem.displayName = "ArticleItem";