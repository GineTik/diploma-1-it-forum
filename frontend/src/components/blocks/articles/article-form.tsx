import { CreateOrUpdateArticleFormData, createOrUpdateArticleSchema } from "@/types";
import { InputBlock, TextareaBlock } from "../form-block";
import { QuestionTagsBlock } from "../questions/form/question-form-tags";
import { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormHandleSubmit } from "react-hook-form";

type ArticleFormProps = {
    action: (handleSubmit: UseFormHandleSubmit<CreateOrUpdateArticleFormData>) => ReactNode
    defaultValues?: CreateOrUpdateArticleFormData
}


export function ArticleForm({action, defaultValues}: ArticleFormProps) {
    const {register, handleSubmit, formState: {errors}, getValues, setValue} = useForm<CreateOrUpdateArticleFormData>({
        defaultValues: defaultValues ?? {},
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
                {action(handleSubmit)}
            </div>
        </div>
    )
}