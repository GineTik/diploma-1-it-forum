import { useArticles } from "@/hooks/posts/use-articles";
import { ArticleItem } from "./article-item";
import { cn } from "@/lib/utils";

type ArticleGridProps = {
    className?: string;
}

export function ArticleGrid({ className }: ArticleGridProps) {
  const {articles} = useArticles();
  
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {articles.map((article, index) => (
        <ArticleItem key={index} {...article} />
      ))}
    </div>
  );
};