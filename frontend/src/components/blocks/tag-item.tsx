import { Tag } from "lucide-react";
import { Badge } from "../ui/badge";

type TagItemProps = {
    name: string;
    className?: string;
}

export function TagItem({ name, className }: TagItemProps) {
    return <Badge variant="secondary" className={className}>
        <Tag className="size-4" />
        {name}
    </Badge>
}