'use client'

import { ArticleCreateAction } from "@/components/blocks/articles/article-create-action";
import { ArticleForm } from "@/components/blocks/articles/article-form";

export default function ArticlesFormPage() {
    return (
        <ArticleForm action={(handleSubmit) => <ArticleCreateAction handleSubmit={handleSubmit} />} />
    )
}