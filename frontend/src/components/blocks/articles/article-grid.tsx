import { ArticleResponse } from "@/types";
import { ArticleItem } from "./article-item";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ArticleGridProps = {
    className?: string;
    articles: ArticleResponse[];
    isLoading?: boolean;
}

export function ArticleGrid({ className, articles, isLoading }: ArticleGridProps) {  
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>

      {articles.length === 0 && (
        <div className="flex justify-center items-center w-full">
          <p className="text-sm text-gray-500">Немає статей</p>
        </div>
      )}

      {articles.map((article, index) => (
        <ArticleItem key={index} {...article} />
      ))}

      {isLoading && (
        <div className="flex justify-center items-center w-full">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      )}
    </div>
  );
};