import { ROUTES } from "@/contants/routes.constants";
import { ARTICLE_SERVICE } from "@/services/articles.service";
import { CreateOrUpdateArticleFormData } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useCreateArticle() {
    const {getToken} = useAuth();
    const router = useRouter();

    const {mutate, isPending, isSuccess} = useMutation({
        mutationKey: ['createArticle'],
        mutationFn: async (article: CreateOrUpdateArticleFormData) => {
            return await ARTICLE_SERVICE.create({
                ...article,
                tags: article.tags.map(tag => tag.id)
            }, await getToken())
        },
        onSuccess: (response) => {
            router.push(ROUTES.ARTICLE(response.data.id));
        }
    });

    return {
        createArticle: mutate,
        isArticlePending: isPending,
        isArticleSuccess: isSuccess,
    }
}