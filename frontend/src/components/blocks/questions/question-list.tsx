import { QuestionItem, QuestionItemProps } from "./question-item";
import { cn } from "@/lib/utils";

type QuestionListProps = {
    className?: string;
    questions: QuestionItemProps[];
}

export function QuestionList({className, questions}: QuestionListProps) {
    return (
      <div className={cn("space-y-4", className)}>
        {questions.map((question, index) => (
          <QuestionItem key={index} {...question} />
        ))}

        {questions.length === 0 && (
          <div className="text-center text-sm text-muted-foreground">
            Немає питань
          </div>
        )}
      </div>
    );
};