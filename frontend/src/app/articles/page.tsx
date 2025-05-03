'use client'

import React from "react";
import { useArticles } from "@/hooks/posts/use-articles";
import { ArticleList } from "@/components/blocks/articles/article-list";

export default function ArticlesPage() {
  const {articles} = useArticles();

  return (
    <div className="p-6 max-w-3xl">
      <ArticleList articles={articles} />
    </div>
  );
}
