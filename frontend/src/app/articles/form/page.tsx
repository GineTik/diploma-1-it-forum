'use client'

import { InputBlock, TextareaBlock } from "@/components/blocks/form-block";
import { QuestionTagsBlock } from "@/components/blocks/questions/form/question-form-tags";
import { Button } from "@/components/ui/button";
import { useCreateArticle } from "@/hooks/posts";
import { CreateOrUpdateArticleFormData, createOrUpdateArticleSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

export default function ArticlesFormPage() {
    const {createArticle, isArticlePending} = useCreateArticle();

    const {register, handleSubmit, formState: {errors}, getValues, setValue} = useForm<CreateOrUpdateArticleFormData>({
        defaultValues: {},
        resolver: zodResolver(createOrUpdateArticleSchema)
    });
    
    return (
        <div className="w-full max-w-[800px] mx-auto pt-5 px-5 space-y-3">
            <InputBlock
                title="Заголовок статті"
                placeholder="Що таке React?"
                error={errors.title?.message}
                {...register('title')}
            />
            <TextareaBlock
                title="Пишіть"
                description="Використовуйте markdown для оформлення тексту"
                error={errors.content?.message}
                className="h-[50vh]"
                {...register('content')}
            />
            <QuestionTagsBlock
                errors={errors}
                setValue={(name, value) => setValue(name as keyof CreateOrUpdateArticleFormData, value)}
                getTags={() => getValues('tags')}
                getTitle={() => getValues('title')}
                getContent={() => getValues('content')}
            />
            <div className="flex justify-end">
                <Button 
                    variant="default" 
                    onClick={handleSubmit((data) => createArticle(data))} 
                    disabled={isArticlePending}
                >
                    {isArticlePending ? <Loader2 className="animate-spin" size={12} /> : 'Опублікувати'}
                </Button>
            </div>
        </div>
    )
}