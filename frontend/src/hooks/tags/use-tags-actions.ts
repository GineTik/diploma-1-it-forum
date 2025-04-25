import { TagsService } from "@/services/tags.service";
import { Tag } from "@/types/tags.type";
import { useMutation } from "@tanstack/react-query";

export const useTagsActions = () => {
    const recomendTagsMutation = useMutation({
        mutationKey: ['recommendTags'],
        mutationFn: async ({title, content}: {title: string, content: string}) => await TagsService.recommend(title, content)
    });

    return {
        recomendedTags: recomendTagsMutation.data?.data as Tag[],
        recommendTags: (title: string, content: string) => recomendTagsMutation.mutate({title, content}),
        isRecommendTagsLoading: recomendTagsMutation.isPending,
        recommendTagsError: recomendTagsMutation.error,
        resetRecommendTags: () => recomendTagsMutation.reset(),
    };
}