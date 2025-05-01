import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { parseDate, equalDates } from "@/lib/dates";

type AnswerDatesProps = HTMLAttributes<HTMLDivElement> & {
    createdAt: string;
    updatedAt: string;
}

export function AnswerDates({createdAt, updatedAt, className, ...props}: AnswerDatesProps) {
    return (
        <div className={cn("text-xs m-0 flex flex-col gap-1 self-end", className)} {...props}>
            <span className="opacity-50">Написано {parseDate(createdAt)}</span>
            
            {!equalDates(createdAt, updatedAt) && <>
                <span className="opacity-50">Оновлено {parseDate(updatedAt)}</span>
            </>}
        </div>
    )
}