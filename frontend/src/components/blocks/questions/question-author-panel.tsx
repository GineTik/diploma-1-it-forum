import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { Pencil, Trash } from "lucide-react";

type QuestionAuthorPanelProps = {
    postId: number;
    authorId: string;
}

export default function QuestionAuthorPanel({authorId}: QuestionAuthorPanelProps) {
    const {userId} = useAuth();

    if (userId != authorId) {
        return <></>;
    }

    return (
        <div className="flex justify-end gap-1">
            <Button variant="outline">
                <Pencil className="size-4" />
                Редагувати
            </Button>
            <Button variant="destructive">
                <Trash className="size-4" />
                Видалити
            </Button>
        </div>
    )
}