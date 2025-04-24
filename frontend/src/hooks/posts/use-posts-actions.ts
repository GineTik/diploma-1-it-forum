import { useMutation } from "@tanstack/react-query";

export const usePostsActions = () => {
  const summarizePostMutation = useMutation({
    mutationKey: ['summarizePost'],
    mutationFn: async (articleId: number) => {
      const response = await fetch(`http://localhost:3001/posts/${articleId}/ai/excerpt`);
      if (!response.ok) {
        throw new Error('Failed to summarize post');
      }
      return response.json();
    }
  });

  return {
    summarizedPostContent: summarizePostMutation.data,
    summarizePost: (articleId: number) => summarizePostMutation.mutate(articleId),
    isSummarizing: summarizePostMutation.isPending,
    summarizeError: summarizePostMutation.error,
  };
};
