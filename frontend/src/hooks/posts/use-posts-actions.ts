'use client';

import { CreateOrUpdatePostRequest, PostResponse } from "@/types/posts.types";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from '@clerk/nextjs';
import { POSTS_SERVICE } from "@/services/posts.service";
import { QUESTIONS_SERVICE } from "@/services/questions.service";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/contants/routes.constants";
import { queryClient } from "@/app/providers";

export const usePostsActions = () => {
  const { getToken } = useAuth();
  const router = useRouter();

  const summarizePostMutation = useMutation({
    mutationKey: ['summarizePost'],
    mutationFn: async (articleId: number) => POSTS_SERVICE.summarize(articleId, await getToken())
  });

  const createQuestionMutation = useMutation({
    mutationKey: ['createQuestion'],
    mutationFn: async (post: CreateOrUpdatePostRequest) => await QUESTIONS_SERVICE.create(post, await getToken()),
    onSuccess: (data) => {
      router.push(ROUTES.QUESTION(data.id));
    }
  });

  return {
    summarizedPostContent: summarizePostMutation.data as unknown as string,
    summarizePost: (articleId: number) => summarizePostMutation.mutate(articleId),
    isSummarizing: summarizePostMutation.isPending,
    summarizeError: summarizePostMutation.error,
    createQuestion: (post: CreateOrUpdatePostRequest) => createQuestionMutation.mutate(post),
    createQuestionAsync: async (post: CreateOrUpdatePostRequest) => createQuestionMutation.mutateAsync(post) as unknown as Promise<PostResponse>,
    isCreatingQuestion: createQuestionMutation.isPending,
    createQuestionError: createQuestionMutation.error,
  };
};

export const useUpdatePost = (postId: number) => {
  const { getToken } = useAuth();

  const updatePostMutation = useMutation({
    mutationKey: ['updatePost'],
    mutationFn: async (post: CreateOrUpdatePostRequest) => await POSTS_SERVICE.update(postId, post, await getToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    }
  });

  return {
    updatePost: (post: CreateOrUpdatePostRequest) => updatePostMutation.mutate(post),
    isUpdatingPost: updatePostMutation.isPending,
    updatePostError: updatePostMutation.error,
  };
};

export const useDeletePost = (postId: number) => {
  const { getToken } = useAuth();
  const router = useRouter();

  const deletePostMutation = useMutation({
    mutationKey: ['deletePost'],
    mutationFn: async () => await POSTS_SERVICE.delete(postId, await getToken()),
    onSuccess: () => {
      router.push(ROUTES.QUESTIONS);
    }
  });

  return {
    deletePost: () => deletePostMutation.mutate(),
    isDeletingPost: deletePostMutation.isPending,
    deletePostError: deletePostMutation.error,
  };
};