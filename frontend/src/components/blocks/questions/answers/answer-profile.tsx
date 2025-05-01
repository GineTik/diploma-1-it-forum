import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/hooks/users/use-users";
import { User } from "@clerk/nextjs/server";

export function AnswerProfile({authorId, postAuthorId}: {authorId: string, postAuthorId: string}) {
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
        <AuthorBadge authorId={authorId} postAuthorId={postAuthorId} />
    </div>)
}

function AuthorBadge({authorId, postAuthorId}: {authorId: string, postAuthorId: string}) {
    if (authorId !== postAuthorId)
        return <></>

    return <Badge variant="secondary">
        Автор питання
    </Badge>
}

function ImageAvatar({user}: {user: User}) {
    return <Avatar className="">
        <AvatarImage src={user?.imageUrl} className="size-7 rounded-full" />
        <AvatarFallback>
            {user?.username?.slice(0, 2)}
        </AvatarFallback>
    </Avatar>
}