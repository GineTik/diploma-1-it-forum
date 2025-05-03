import { TAGS_SERVICE } from "@/services/tags.service";
import { useMutation } from "@tanstack/react-query";

export const useRecommendTags = () => {
    const recomendTagsMutation = useMutation({
        mutationKey: ['recommendTags'],
        mutationFn: async ({title, content}: {title: string, content: string}) => await TAGS_SERVICE.recommend(title, content)
    });

    return {
        recomendedTags: recomendTagsMutation.data?.data,
        recommendTags: (title: string, content: string) => recomendTagsMutation.mutate({title, content}),
        isRecommendTagsLoading: recomendTagsMutation.isPending,
        recommendTagsError: recomendTagsMutation.error,
        resetRecommendTags: () => recomendTagsMutation.reset(),
    };
}