import { LoadingButton } from "@/components/ui/loading-button";
import { useCreateArticle } from "@/hooks/posts";
import { CreateOrUpdateArticleFormData } from "@/types";
import { UseFormHandleSubmit } from "react-hook-form";

type ArticleCreateActionProps = {
    handleSubmit: UseFormHandleSubmit<CreateOrUpdateArticleFormData>
}

export function ArticleCreateAction({handleSubmit}: ArticleCreateActionProps) {
    const {createArticle, isArticlePending, isArticleSuccess} = useCreateArticle();

    return (
        <LoadingButton 
            variant="default" 
            onClick={handleSubmit((data) => createArticle(data))} 
            isLoading={isArticlePending || isArticleSuccess}
        >
            Опублікувати
        </LoadingButton>
    )
}