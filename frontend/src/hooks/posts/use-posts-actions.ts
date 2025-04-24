import { CreatePost } from "@/types/posts.types";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from '@clerk/nextjs';

export const usePostsActions = () => {
  const { getToken } = useAuth();

  const summarizePostMutation = useMutation({
    mutationKey: ['summarizePost'],
    mutationFn: async (articleId: number) => {
      const response = await fetch(`http://localhost:3001/posts/${articleId}/ai/excerpt`);
      if (!response.ok) {
        throw new Error('Failed to summarize post');
      }
      return await response.text();
    }
  });

  const createQuestionMutation = useMutation({
    mutationKey: ['createQuestion'],
    mutationFn: async (post: CreatePost) => {
      const token = await getToken();
      const response = await fetch(`http://localhost:3001/posts/questions`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.json();
    }
  });

  return {
    summarizedPostContent: summarizePostMutation.data,
    summarizePost: (articleId: number) => summarizePostMutation.mutate(articleId),
    isSummarizing: summarizePostMutation.isPending,
    summarizeError: summarizePostMutation.error,
    createQuestion: (post: CreatePost) => createQuestionMutation.mutate(post),
    isCreatingQuestion: createQuestionMutation.isPending,
    createQuestionError: createQuestionMutation.error,
  };
};
