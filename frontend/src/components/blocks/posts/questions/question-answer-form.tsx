import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PostFormBlock from "../post-form-block";
import { SignedIn, useAuth } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useCreateAnswer } from "@/hooks/answers/use-answers-actions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

type QuestionAnswerFormProps = {
    postId: number;
}

export default function QuestionAnswerForm({postId}: QuestionAnswerFormProps) {
    const {createAnswer, isCreatingAnswer} = useCreateAnswer(Number(postId))

    const zodSchema = z.object({
        content: z.string().min(1),
    })

    const form = useForm<z.infer<typeof zodSchema>>({
        defaultValues: {},
        resolver: zodResolver(zodSchema),
    })

    const onSubmit = (data: z.infer<typeof zodSchema>) => {
        createAnswer(data.content)
    }

    return (
        <SignedIn>
            <PostFormBlock>
                <div className="flex gap-2 justify-between">
                    <div>
                        <h2 className="font-bold">Надайте вашу відпоідь</h2>
                        <p className="opacity-50 text-sm">Використовуйте markdown для оформлення тексту</p>
                    </div>
                    <Button variant="secondary" onClick={form.handleSubmit(onSubmit)} disabled={isCreatingAnswer}>
                        {isCreatingAnswer ? <Loader2 className="size-4 animate-spin" /> : "Відправити"}
                    </Button>
                </div>
                <Textarea placeholder="Ваша відповідь" {...form.register("content")} />
            </PostFormBlock>
        </SignedIn>
    )
}