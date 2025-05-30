import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { parseDate } from "@/lib/dates";

type PublishDatesProps = HTMLAttributes<HTMLDivElement> & {
    createdAt: string;
    updatedAt: string;
}

export function PublishDates({createdAt, updatedAt, className, ...props}: PublishDatesProps) {
    return (
        <div className={cn("text-xs m-0 flex flex-col gap-1 self-end", className)} {...props}>
            <span className="opacity-50">Написано {parseDate(createdAt)}</span>
            {createdAt !== updatedAt && <span className="opacity-50">Оновлено {parseDate(updatedAt)}</span>}
        </div>
    )
}