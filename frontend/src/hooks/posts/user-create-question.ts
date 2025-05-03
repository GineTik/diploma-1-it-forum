import { ROUTES } from "@/contants/routes.constants";
import { QUESTIONS_SERVICE } from "@/services/questions.service";
import { QuestionFormData } from "@/types/posts.types";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useCreateQuestionActions = () => {
    const { getToken } = useAuth();
    const router = useRouter();
  
  
    const createQuestionMutation = useMutation({
      mutationKey: ['createQuestion'],
      mutationFn: async (post: QuestionFormData) => {
        return await QUESTIONS_SERVICE.create({
          ...post,
          content: post.contentProblem + "\n\n" + post.contentTried,
          tags: post.tags.map(tag => tag.id)
        }, await getToken())
      },
      onSuccess: (response) => {
        router.push(ROUTES.QUESTION(response.data.id));
      }
    });

    return {
      createQuestion: (post: QuestionFormData) => createQuestionMutation.mutate(post),
      createQuestionAsync: async (post: QuestionFormData) => await createQuestionMutation.mutateAsync(post),
      isCreatingQuestion: createQuestionMutation.isPending,
      createQuestionError: createQuestionMutation.error
    };
};
  