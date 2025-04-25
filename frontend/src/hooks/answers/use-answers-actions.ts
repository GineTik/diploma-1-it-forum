import { useMutation } from "@tanstack/react-query";
import { AnswersService } from "@/services/answers.service";

export const useCreateAnswer = (postId: number) => {
    const {mutate: createAnswer, isPending: isCreatingAnswer} = useMutation({
        mutationFn: (content: string) => AnswersService.create(postId, content),
    })

    return {
        createAnswer,
        isCreatingAnswer,
    }
}