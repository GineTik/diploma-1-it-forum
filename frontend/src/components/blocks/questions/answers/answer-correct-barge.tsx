import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

export function AnswerCorrectBarge() {
    return (
        <Badge variant="success">
            <Check className="size-4" />
            Автор позначив як правильну
        </Badge>
    )
}