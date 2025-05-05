'use client'

import { ArticleGrid } from "@/components/blocks/articles/article-grid";
import { usePersonalArticles } from "@/hooks/posts/use-articles";

export default function PersonalArticlesPage() {
    const {articles, isArticlesLoading} = usePersonalArticles();

    return (
        <div className="p-6">
            <ArticleGrid articles={articles} isLoading={isArticlesLoading} />
        </div>
    )
}