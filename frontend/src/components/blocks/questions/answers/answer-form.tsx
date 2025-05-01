import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SignedIn } from "@clerk/nextjs";
import { useCreateAnswer } from "@/hooks/answers/use-answers-actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { AnswerRequest, AnswerRequestSchema } from "@/types/answers.types";
import { useCallback } from "react";
import PostFormBlock from "../../post-form-block";
import { ErrorMessage } from "@/components/ui/error-message";

type AnswerFormProps = {
    postId: number;
}

export default function AnswerForm({postId}: AnswerFormProps) {
    const {createAnswer, isCreatingAnswer} = useCreateAnswer(Number(postId))

    const {reset, register, handleSubmit, formState} = useForm<z.infer<typeof AnswerRequestSchema>>({
        defaultValues: {},
        resolver: zodResolver(AnswerRequestSchema),
    })
    const {errors} = formState;

    const onSubmit = useCallback((data: z.infer<typeof AnswerRequestSchema>) => {
        createAnswer(data as AnswerRequest)
        reset()
    }, [createAnswer, reset])

    return (
        <SignedIn>
            <PostFormBlock>
                <div className="flex gap-2 justify-between">
                    <div>
                        <h2 className="font-bold">Надайте вашу відпоідь</h2>
                        <p className="opacity-50 text-sm">Використовуйте markdown для оформлення тексту</p>
                    </div>
                    <Button variant="secondary" onClick={handleSubmit(onSubmit)}>
                        {isCreatingAnswer ? <Loader2 className="size-4 animate-spin" /> : "Відправити"}
                    </Button>
                </div>
                <Textarea placeholder="Ваша відповідь" {...register("content")} />
                {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
            </PostFormBlock>
        </SignedIn>
    )
}