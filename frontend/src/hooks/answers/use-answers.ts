import { ANSWERS_SERVICE } from "@/services/answers.service";
import { AnswerResponse } from "@/types/answers.types";
import { useQuery } from "@tanstack/react-query";

export const useAnswers = (postId: number) => {
    const { data, isLoading, error, refetch } = useQuery<AnswerResponse[]>({
        queryKey: ['answers', postId],
        queryFn: async () => await ANSWERS_SERVICE.getAllByPostId(postId),
    });

    return {
        answers: data,
        isAnswersLoading: isLoading,
        answersError: error,
        refetchAnswers: refetch,
    };
};
