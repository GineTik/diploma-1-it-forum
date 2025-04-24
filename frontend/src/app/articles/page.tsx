'use client'

import React from "react";
import { cn } from "@/lib/utils";
import { useArticles } from "@/hooks/posts/use-articles";
import { ArticleItem, ArticleItemProps } from "@/components/blocks/posts/articles/article-item";

interface ArticleListProps {
  articles: ArticleItemProps[];
  className?: string;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, className }) => {
  return (
    <div className={cn("space-y-4", className)}>
      {articles.map((article, index) => (
        <ArticleItem key={index} {...article} />
      ))}
    </div>
  );
};

export default function ArticlesPage() {
  const {articles} = useArticles();

  return (
    <div className="p-6 max-w-3xl">
      <ArticleList articles={articles} />
    </div>
  );
}
