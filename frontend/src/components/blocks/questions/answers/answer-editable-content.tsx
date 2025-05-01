import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateAnswer } from "@/hooks/answers/use-answers-actions";
import { AnswerRequestSchema } from "@/types/answers.types";
import { Loader2 } from "lucide-react";
import { useCallback, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type AnswerEditableContentProps = {
    answerId: number;
    content: string;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export function AnswerEditableContent({answerId, content, setIsEditing}: AnswerEditableContentProps) {
    const {register, handleSubmit, formState} = useForm<z.infer<typeof AnswerRequestSchema>>({
        defaultValues: {
            content: content,
        },
    })
    const {errors} = formState;
    const {updateAnswer, isUpdatingAnswer} = useUpdateAnswer(answerId);

    const onSubmit = useCallback((data: z.infer<typeof AnswerRequestSchema>) => {
        updateAnswer(data);
        setIsEditing(false);
    }, [updateAnswer, setIsEditing])

    return (
        <div className="space-y-2">
            <Textarea defaultValue={content} {...register("content")} />
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
            <Button variant="default" onClick={handleSubmit(onSubmit)} disabled={isUpdatingAnswer} className="sm:ml-auto sm:block max-sm:w-full">
                {isUpdatingAnswer ? <Loader2 className="size-4 animate-spin" /> : "Зберегти"}
            </Button>
        </div>
    )
}