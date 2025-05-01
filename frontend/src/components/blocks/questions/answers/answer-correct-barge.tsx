import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

type AnswerCorrectBargeProps = {
    isCorrect: boolean;
}

export function AnswerCorrectBarge({isCorrect}: AnswerCorrectBargeProps) {
    if (!isCorrect)
        return <></>

    return (
        <Badge variant="success">
            <Check className="size-4" />
            Автор позначив як правильну
        </Badge>
    )
}