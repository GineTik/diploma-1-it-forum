import { LoadingButton } from "@/components/ui/loading-button";
import { useUpdateArticle } from "@/hooks/posts";
import { CreateOrUpdateArticleFormData } from "@/types";
import { useCallback, useEffect } from "react";
import { UseFormHandleSubmit } from "react-hook-form";

type ArticleUpdateActionProps = {
    handleSubmit: UseFormHandleSubmit<CreateOrUpdateArticleFormData>
    articleId: number
    onSuccess: () => void
}

export function ArticleUpdateAction({handleSubmit, articleId, onSuccess}: ArticleUpdateActionProps) {
    const {updateArticle, isArticlePending, isArticleSuccess} = useUpdateArticle(articleId);

    const submit = useCallback((data: CreateOrUpdateArticleFormData) => {
        updateArticle(data)
        onSuccess()
    }, [updateArticle, onSuccess])

    useEffect(() => {
        if (isArticleSuccess) {
            onSuccess()
        }
    }, [onSuccess, isArticleSuccess])

    return (
        <LoadingButton 
            variant="default" 
            onClick={handleSubmit(submit)} 
            isLoading={isArticlePending || isArticleSuccess}
        >
            Оновити
        </LoadingButton>
    )
}