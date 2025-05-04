import { useArticles } from "@/hooks/posts/use-articles";
import { ArticleItem } from "./article-item";
import { cn } from "@/lib/utils";

type ArticleListProps = {
    className?: string;
}

export function ArticleList({ className }: ArticleListProps) {
  const {articles} = useArticles();
  
  return (
    <div className={cn("space-y-4", className)}>
      {articles.map((article, index) => (
        <ArticleItem key={index} {...article} />
      ))}
    </div>
  );
};
  