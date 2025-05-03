import { ANSWERS_SERVICE } from "@/services/answers.service";
import { useQuery } from "@tanstack/react-query";

export const useAnswers = (postId: number) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['answers', postId],
        queryFn: async () => await ANSWERS_SERVICE.getAllByPostId(postId),
    });

    return {
        answers: data?.data ?? [],
        isAnswersLoading: isLoading,
        answersError: error,
        refetchAnswers: refetch,
    };
};
