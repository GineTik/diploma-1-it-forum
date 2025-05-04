import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/hooks/users/use-users";
import { User } from "@/types";

type ArticleProfileProps = {
    authorId: string;
}

export function ArticleProfile({authorId}: ArticleProfileProps) {
    const { user, isUserLoading } = useUsers(authorId);

    if (isUserLoading)
        return <Skeleton className="size-7 rounded-full animate-pulse" />

    return (<div className="flex gap-2 items-center">
        <ImageAvatar user={user} />
        <div className="flex flex-col">
            <span className="text-sm font-medium">@{user?.username}</span>
            <span className="text-xs text-muted-foreground">
                {user?.firstName} {user?.lastName}
            </span>
        </div>
    </div>)
}

function ImageAvatar({user}: {user: User}) {
    return <Avatar className="">
        <AvatarImage src={user?.imageUrl} className="size-7 rounded-full" />
        <AvatarFallback>
            {user?.username?.slice(0, 2)}
        </AvatarFallback>
    </Avatar>
}