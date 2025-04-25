import { ANSWERS_SERVICE } from "@/services/answers.service";
import { Answer } from "@/types/answers.types";
import { useQuery } from "@tanstack/react-query";

export const useAnswers = (postId: number) => {
    const { data, isLoading, error } = useQuery<Answer[]>({
        queryKey: ['answers', postId],
        queryFn: async () => await ANSWERS_SERVICE.getAllByPostId(postId),
    });

    return {
        answers: data,
        isAnswersLoading: isLoading,
        answersError: error,
    };
};
