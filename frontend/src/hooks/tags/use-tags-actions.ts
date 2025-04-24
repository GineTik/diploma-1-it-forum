import { CreateTag, Tag } from "@/types/tags.type";
import { useMutation } from "@tanstack/react-query";

export const useTagsActions = () => {
    const recomendTagsMutation = useMutation({
        mutationKey: ['recommendTags'],
        mutationFn: async ({title, content}: {title: string, content: string}) => {
          const response = await fetch(`http://localhost:3001/tags/ai/recommend?title=${title}&content=${content}`);
          if (!response.ok) {
            throw new Error('Failed to recommend tags');
          }
          return response.json();
        }
    });

    return {
        recomendedTags: recomendTagsMutation.data as Tag[],
        recommendTags: (title: string, content: string) => recomendTagsMutation.mutate({title, content}),
        isRecommendTagsLoading: recomendTagsMutation.isPending,
        recommendTagsError: recomendTagsMutation.error,
        resetRecommendTags: () => recomendTagsMutation.reset(),
    };
}