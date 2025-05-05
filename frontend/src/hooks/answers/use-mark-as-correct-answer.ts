import { useMutation } from "@tanstack/react-query";
import { ANSWERS_SERVICE } from "@/services/answers.service";
import { useAuth } from "@clerk/nextjs";
import { queryClient } from "@/app/providers";

export const useMarkAsCorrectAnswer = () => {
    const { getToken } = useAuth();

    const { mutate, isPending, error } = useMutation({
        mutationKey: ["mark-as-correct-answer"],
        mutationFn: async (answerId: number) => await ANSWERS_SERVICE.markAsCorrect(answerId, await getToken()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["answer"] });
            queryClient.invalidateQueries({ queryKey: ["answers"] });
        },
    });

    return {
        markAsCorrect: mutate,
        isMarkingAsCorrect: isPending,
        markAsCorrectError: error,
    };
};
