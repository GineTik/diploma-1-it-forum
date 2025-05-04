import { Button } from "@/components/ui/button";
import { useCreateArticle } from "@/hooks/posts";
import { CreateOrUpdateArticleFormData } from "@/types";
import { Loader2 } from "lucide-react";
import { UseFormHandleSubmit } from "react-hook-form";

type ArticleCreateActionProps = {
    handleSubmit: UseFormHandleSubmit<CreateOrUpdateArticleFormData>
}

export function ArticleCreateAction({handleSubmit}: ArticleCreateActionProps) {
    const {createArticle, isArticlePending} = useCreateArticle();

    return (
        <Button 
            variant="default" 
            onClick={handleSubmit((data) => createArticle(data))} 
            disabled={isArticlePending}
        >
            {isArticlePending ? <Loader2 className="animate-spin" size={12} /> : 'Опублікувати'}
        </Button>
    )
}