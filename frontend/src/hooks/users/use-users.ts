import { useQuery } from "@tanstack/react-query";
import { USERS_SERVICE } from "@/services/users.service";
import { User } from "@clerk/nextjs/server";

export const useUsers = (id: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['user', id],
        queryFn: () => USERS_SERVICE.findOne(id),
    });

    return {
        user: data as unknown as User,
        isUserLoading: isLoading,
        userError: error,
    };
};
