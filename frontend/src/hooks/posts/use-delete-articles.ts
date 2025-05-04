import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { useAuth } from "@clerk/nextjs";
import { ARTICLE_SERVICE } from "@/services/articles.service";
import { ROUTES } from "@/contants/routes.constants";
import { useRouter } from "next/navigation";

export const useDeleteArticles = (articleId: number) => {
    const {getToken} = useAuth()
    const router = useRouter()

    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ['deleteArticle', articleId],
        mutationFn: async () => await ARTICLE_SERVICE.delete(articleId, await getToken()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
            router.push(ROUTES.ARTICLES);
        },
    });

    return { 
        deleteArticle: mutate, 
        isDeletePending: isPending,
        isDeleteSuccess: isSuccess,
    };
};