import { queryClient } from "@/app/providers";
import { ARTICLE_SERVICE } from "@/services/articles.service";
import { CreateOrUpdateArticleFormData } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";

export function useUpdateArticle(articleId: number) {
    const {getToken} = useAuth()

    const {mutate: updateArticle, isPending: isArticlePending, isSuccess: isArticleSuccess} = useMutation({
        mutationKey: ['updateArticle', articleId],
        mutationFn: async (data: CreateOrUpdateArticleFormData) => {
            return await ARTICLE_SERVICE.update(
                articleId, 
                {
                    ...data,
                    tags: data.tags.map((tag) => tag.id)
                }, 
                await getToken())
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['articles']})
        }
    })

    return {updateArticle, isArticlePending, isArticleSuccess}
}