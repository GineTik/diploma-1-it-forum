'use client'

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionFormData, createQuestionSchema } from "@/types";
import { InputBlock, TextareaBlock } from "../../form-block";
import { QuestionTagsBlock } from "./question-form-tags";
import { Loader2 } from "lucide-react";
import { useCreateQuestionActions } from "@/hooks/posts";

export default function QuestionsForm() {
    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm<QuestionFormData>({
        defaultValues: {},
        resolver: zodResolver(createQuestionSchema)
    });

    const {createQuestion, isCreatingQuestion} = useCreateQuestionActions();

    return (
        <div className="w-full max-w-[800px] mx-auto pt-5 px-5 space-y-3">
            <InputBlock 
                title="Назва питання" 
                placeholder="Що таке React?" 
                error={errors.title?.message} 
                {...register('title')} />
            <TextareaBlock 
                title="Опишіть ваше питання або проблему" 
                description="Використовуйте markdown для оформлення тексту"
                error={errors.contentProblem?.message}
                {...register('contentProblem')} />
            <TextareaBlock 
                title="Що ви вже пробували?" 
                description="Використовуйте markdown для оформлення тексту"
                error={errors.contentTried?.message}
                {...register('contentTried')} />
            <QuestionTagsBlock errors={errors} getValues={getValues} setValue={setValue} />
            
            <div className="flex justify-end">
                <Button variant="default" className="flex items-center" onClick={handleSubmit(createQuestion)}>
                    {isCreatingQuestion ? <Loader2 className="animate-spin" size={12} /> : 'Опублікувати'}
                </Button>
            </div>
        </div>
    )
}