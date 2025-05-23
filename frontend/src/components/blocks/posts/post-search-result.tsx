import { useSearchPosts } from "@/hooks/posts/use-search-posts";
import { PostItem } from "./post-item";

type PostSearchResultProps = {
  search: string;
};

export const PostSearchResult = ({ search }: PostSearchResultProps) => {
  const { posts, isPostsLoading } = useSearchPosts(search);
  console.log(posts);

  return <div>
    {isPostsLoading ? (
        <div>
          <p>Завантаження...</p>
        </div>
      ) : (
        <div className="space-y-2">
          {posts?.map((post) => (
            <div key={post.id}>
              <PostItem post={post} />
            </div>
          ))}
        </div>
      )}
  </div>;
};
