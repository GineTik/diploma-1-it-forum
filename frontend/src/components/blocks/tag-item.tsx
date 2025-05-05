import { Tag } from "lucide-react";
import { Badge } from "../ui/badge";

type TagItemProps = {
    name: string;
    className?: string;
    actions?: React.ReactNode;
}

export function TagItem({ name, className, actions }: TagItemProps) {
    return <Badge variant="secondary" className={className}>
        <Tag className="size-4" />
        {name}
        {actions}
    </Badge>
}