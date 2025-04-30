import { CreatePost, Post } from "@/types/posts.types";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from '@clerk/nextjs';
import { POSTS_SERVICE } from "@/services/posts.service";
import { QUESTIONS_SERVICE } from "@/services/questions.service";
import { AxiosResponse } from "axios";

export const usePostsActions = () => {
  const { getToken } = useAuth();

  const summarizePostMutation = useMutation({
    mutationKey: ['summarizePost'],
    mutationFn: async (articleId: number) => POSTS_SERVICE.summarizePost(articleId, await getToken())
  });

  const createQuestionMutation = useMutation({
    mutationKey: ['createQuestion'],
    mutationFn: async (post: CreatePost) => await QUESTIONS_SERVICE.create(post, await getToken())
  });

  return {
    summarizedPostContent: summarizePostMutation.data,
    summarizePost: (articleId: number) => summarizePostMutation.mutate(articleId),
    isSummarizing: summarizePostMutation.isPending,
    summarizeError: summarizePostMutation.error,
    createQuestion: (post: CreatePost) => createQuestionMutation.mutate(post),
    createQuestionAsync: async (post: CreatePost) => createQuestionMutation.mutateAsync(post) as unknown as Promise<Post>,
    isCreatingQuestion: createQuestionMutation.isPending,
    createQuestionError: createQuestionMutation.error,
  };
};
