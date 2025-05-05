'use client'

import React from "react";
import { ArticleGrid } from "@/components/blocks/articles/article-grid";
import { useArticles } from "@/hooks/posts/use-articles";

export default function ArticlesPage() {
  const {articles, isArticlesLoading} = useArticles();

  return (
    <div className="p-6">
      <ArticleGrid articles={articles} isLoading={isArticlesLoading} />
    </div>
  );
}
