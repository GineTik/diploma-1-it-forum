import { POSTS_SERVICE } from "@/services/posts.service";
import { useQuery } from "@tanstack/react-query";

export const useSearchPosts = (search: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["posts", search],
        queryFn: async () => await POSTS_SERVICE.search(search),
    });

    return { posts: data?.data, isPostsLoading: isLoading, postsError: error };
};
