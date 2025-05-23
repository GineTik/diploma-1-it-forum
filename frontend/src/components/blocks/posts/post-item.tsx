import { PostResponse } from "@/types/posts.types";
import PostFormBlock from "../post-form-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ROUTES } from "@/contants/routes.constants";
import Link from "next/link";

type PostItemProps = {
    post: PostResponse;
};

export const PostItem = ({ post }: PostItemProps) => {
    return (
        <PostFormBlock className="flex items-center justify-start gap-2">
            <h2 className="text-lg font-bold m-0">{post.title}</h2>
            <Badge variant='outline' className="m-0">{post.isArticle ? "Стаття" : "Питання"}</Badge>
            <Button variant='outline' asChild className="ml-auto">
                <Link href={post.isArticle ? ROUTES.ARTICLE(post.id) : ROUTES.QUESTION(post.id)}>
                    Перейти <ArrowRightIcon className="w-4 h-4" />
                </Link>
            </Button>
        </PostFormBlock>
    );
};