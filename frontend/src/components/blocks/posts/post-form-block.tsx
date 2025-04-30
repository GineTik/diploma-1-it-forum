import { twMerge } from "tailwind-merge";

export default function PostFormBlock({children, className}: {children: React.ReactNode, className?: string}) {
    return (
        <div className={twMerge('p-3 bg-popover rounded-[.5rem] space-y-2', className)}>
            {children}
        </div>
    )
}