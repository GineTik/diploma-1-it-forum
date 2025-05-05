import { LoadingButton } from "@/components/ui/loading-button";
import { useMarkAsCorrectAnswer } from "@/hooks/answers/use-mark-as-correct-answer";
import { CheckIcon } from "lucide-react";

type AnswerMarkAsCorrectActionProps = {
    answerId: number;
}

export function AnswerMarkAsCorrectAction({ answerId }: AnswerMarkAsCorrectActionProps) {
    const { markAsCorrect, isMarkingAsCorrect } = useMarkAsCorrectAnswer();

    return <LoadingButton 
        variant="outline"
        size="sm"
        isLoading={isMarkingAsCorrect} 
        onClick={() => markAsCorrect(answerId)}
    >
        <CheckIcon className="w-4 h-4" />
        Позначити як правильний
    </LoadingButton>
}
