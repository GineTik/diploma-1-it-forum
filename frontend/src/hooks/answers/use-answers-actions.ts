import { useMutation } from "@tanstack/react-query";
import { ANSWERS_SERVICE } from "@/services/answers.service";

export const useCreateAnswer = (postId: number) => {
    const {mutate: createAnswer, isPending: isCreatingAnswer} = useMutation({
        mutationFn: (content: string) => ANSWERS_SERVICE.create(postId, content),
    })

    return {
        createAnswer,
        isCreatingAnswer,
    }
}