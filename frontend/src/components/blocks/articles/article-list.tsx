import { ArticleItem, ArticleItemProps } from "./article-item";
import { cn } from "@/lib/utils";

type ArticleListProps = {
    articles: ArticleItemProps[];
    className?: string;
}

export function ArticleList({ articles, className }: ArticleListProps) {
    return (
      <div className={cn("space-y-4", className)}>
        {articles.map((article, index) => (
          <ArticleItem key={index} {...article} />
        ))}
      </div>
    );
};
  