import { queryClient } from "@/app/providers";
import { TAGS_SERVICE } from "@/services/tags.service";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTag = () => {
    const {getToken} = useAuth()

    const {mutate, isPending, isSuccess} = useMutation({
        mutationKey: ["deleteTag"],
        mutationFn: async (id: number) => await TAGS_SERVICE.delete(id, await getToken()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tags"] });
        },
    });

    return {
        deleteTag: mutate, 
        isDeletePending: isPending, 
        isDeleteSuccess: isSuccess,
    };
}