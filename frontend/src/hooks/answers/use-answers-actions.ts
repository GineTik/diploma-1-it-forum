import { useMutation } from "@tanstack/react-query";
import { ANSWERS_SERVICE } from "@/services/answers.service";
import { useAuth } from "@clerk/nextjs";
import { queryClient } from "@/app/providers";
import { AnswerRequest } from "@/types/answers.types";

export const useCreateAnswer = (postId: number) => {
    const {getToken} = useAuth();
    const {mutate: createAnswer, isPending: isCreatingAnswer} = useMutation({
        mutationFn: async (answer: AnswerRequest) => ANSWERS_SERVICE.create(postId, answer, await getToken()),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['answers', postId]});
        },
    })

    return {
        createAnswer,
        isCreatingAnswer,
    }
}

export const useDeleteAnswer = (answerId: number) => {
    const {getToken} = useAuth();
    const {mutate: deleteAnswer, isPending: isDeletingAnswer} = useMutation({
        mutationFn: async () => ANSWERS_SERVICE.delete(answerId, await getToken()),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['answers']});
        },
    })

    return {
        deleteAnswer,
        isDeletingAnswer,
    }
}

export const useUpdateAnswer = (answerId: number) => {
    const {getToken} = useAuth();
    const {mutate: updateAnswer, isPending: isUpdatingAnswer, error: updateAnswerError} = useMutation({
        mutationFn: async (answer: AnswerRequest) => ANSWERS_SERVICE.update(answerId, answer, await getToken()),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['answers']});
        },
    })

    return {
        updateAnswer,
        isUpdatingAnswer,
        updateAnswerError,
    }
}