import { TAGS_SERVICE } from "@/services/tags.service";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/app/providers";
import { CreateTagRequest } from "@/types";
import { useAuth } from "@clerk/nextjs";

export const useCreateTag = () => {
    const {getToken} = useAuth()

    const {mutate, isPending, isSuccess} = useMutation({
        mutationKey: ["createTag"],
        mutationFn: async (tags: CreateTagRequest) => await TAGS_SERVICE.create(tags, await getToken()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tags"] });
        },
    });

    return {
        createTag: mutate,
        isCreateTagPending: isPending,
        isCreateTagSuccess: isSuccess,
    }
}