import { useQuery } from "@tanstack/react-query";
import { USERS_SERVICE } from "@/services/users.service";

export const useUsers = (id: string) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['user', id],
        queryFn: () => USERS_SERVICE.findOne(id),
    });

    return {
        user: data?.data,
        isUserLoading: isLoading,
        userError: error,
        refetchUser: refetch,
    };
};
