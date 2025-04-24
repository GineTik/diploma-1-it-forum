import { Tag } from "@/types/tags.type";
import { useMutation } from "@tanstack/react-query";

export const useTagsActions = () => {
    const recomendTagsMutation = useMutation({
        mutationKey: ['summarizePost'],
        mutationFn: async (articleId: number) => {
          const response = await fetch(`http://localhost:3001/posts/${articleId}/tags/ai/recommend`);
          if (!response.ok) {
            throw new Error('Failed to recommend tags');
          }
          return response.json();
        }
    });

    return {
        recomendedTags: recomendTagsMutation.data as Tag[],
        recommendTags: (articleId: number) => recomendTagsMutation.mutate(articleId),
        isRecommendTagsLoading: recomendTagsMutation.isPending,
        recommendTagsError: recomendTagsMutation.error,
    };
}