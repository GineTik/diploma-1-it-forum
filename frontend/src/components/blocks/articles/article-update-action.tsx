import { Button } from "@/components/ui/button";
import { useUpdateArticle } from "@/hooks/posts";
import { CreateOrUpdateArticleFormData } from "@/types";
import { Loader2 } from "lucide-react";
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
        <Button 
            variant="default" 
            onClick={handleSubmit(submit)} 
            disabled={isArticlePending}
        >
            {isArticlePending ? <Loader2 className="animate-spin" size={12} /> : 'Оновити'}
        </Button>
    )
}