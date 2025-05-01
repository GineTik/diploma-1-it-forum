'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultipleSelector, { MultiselectOption } from "@/components/ui/multiselect";
import { Textarea } from "@/components/ui/textarea";
import { usePostsActions } from "@/hooks/posts/use-posts-actions";
import { useTags } from "@/hooks/tags/use-tags";
import { useRecommendTags } from "@/hooks/tags/use-recommend-tags";
import { TagResponse } from "@/types/tags.type";
import { Loader2, Sparkles } from "lucide-react";
import { useCallback } from "react";
import { FieldErrors, useForm, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionFormData, questionSchema } from "@/types/posts.types";
import { BaseBlock } from "../base-form-block";

export default function QuestionsForm() {
    const {createQuestionAsync, isCreatingQuestion} = usePostsActions();

    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm<QuestionFormData>({
        defaultValues: {},
        resolver: zodResolver(questionSchema)
    });

    const submitPost = useCallback((data: QuestionFormData) => {
        createQuestionAsync({
            ...data,
            content: data.contentProblem + "\n\n" + data.contentTried,
            tags: data.tags.map(tag => tag.id)
        })
    }, [createQuestionAsync]);

    return (
        <div className="w-full max-w-[800px] mx-auto pt-5 px-5 space-y-3">
            <TitleInput register={register} errors={errors} />
            <ContentDescriptionTextarea register={register} errors={errors} />
            <ContentTriesTextarea register={register} errors={errors} />
            <TagsBlock register={register} errors={errors} getValues={getValues} setValue={setValue} />
            
            <div className="flex justify-end">
                <Button variant="default" className="flex items-center" onClick={handleSubmit(submitPost)}>
                    {isCreatingQuestion ? <Loader2 className="animate-spin" size={12} /> : 'Опублікувати'}
                </Button>
            </div>
        </div>
    )
}

function TitleInput({register, errors}: {register: UseFormRegister<QuestionFormData>, errors: FieldErrors<QuestionFormData>}) {
    return <BaseBlock title="Коротко напишіть суть питання" error={errors.title?.message}>
        <Input placeholder="Що таке React?" {...register('title')} />
    </BaseBlock>
}

function ContentDescriptionTextarea({register, errors}: {register: UseFormRegister<QuestionFormData>, errors: FieldErrors<QuestionFormData>}) {
    return <BaseBlock title="Опишіть ваше питання або проблему" error={errors.contentProblem?.message}>
        <p className="opacity-50 text-sm -mt-2">Використовуйте markdown для оформлення тексту</p>
        <Textarea placeholder="В мене є проблема з..." {...register('contentProblem')} />
    </BaseBlock>
}

function ContentTriesTextarea({register, errors}: {register: UseFormRegister<QuestionFormData>, errors: FieldErrors<QuestionFormData>}) {
    return <BaseBlock title="Що ви вже пробували?" error={errors.contentTried?.message}>
        <p className="opacity-50 text-sm -mt-2">Використовуйте markdown для оформлення тексту</p>
        <Textarea placeholder="Я вже викорисав..." className="h-[200px]" {...register('contentTried')} />
    </BaseBlock>
}

type TagsBlockProps = {
    register: UseFormRegister<QuestionFormData>;
    errors: FieldErrors<QuestionFormData>;
    getValues: UseFormGetValues<QuestionFormData>;
    setValue: UseFormSetValue<QuestionFormData>;
}

function TagsBlock({register, errors, getValues, setValue}: TagsBlockProps) {
    const {tags, isTagsLoading} = useTags();
    const {recomendedTags, isRecommendTagsLoading, recommendTags, resetRecommendTags} = useRecommendTags();

    const parseTagsToOptions = useCallback((tags: TagResponse[]): MultiselectOption[] => {
        return tags?.map(tag => ({label: tag.name, value: tag.name})) ?? [];
    }, []);
    
    const parseOptionsToTags = useCallback((options: MultiselectOption[]): TagResponse[] => {
        return options?.map(option => tags.find(tag => tag.name === option.value)).filter(tag => tag !== undefined) ?? [];
    }, [tags]);

    const applyRecommendedTags = useCallback(() => {
        setValue('tags', recomendedTags);
        resetRecommendTags();
    }, [recomendedTags, setValue, resetRecommendTags]);

    return <BaseBlock title="Додайте теги" error={errors.tags?.message}>
            <div className="flex items-center gap-2">
                {isTagsLoading ? <Loader2 className="animate-spin" size={12} /> : <MultipleSelector
                    defaultOptions={parseTagsToOptions(tags)}
                    emptyIndicator={<p className="text-center text-sm">Тегів не знайдено</p>}
                    hidePlaceholderWhenSelected
                    value={parseTagsToOptions(getValues('tags'))}
                    onChange={(tags) => setValue('tags', parseOptionsToTags(tags))}
                />}
                <Button variant="outline" size='icon' onClick={() => recommendTags(getValues('title'), getValues('contentProblem') + getValues('contentTried'))}>
                    {isRecommendTagsLoading
                        ? <Loader2 className="animate-spin" size={12} />
                        : <Sparkles size={12} />}
                </Button>
            </div>
            {recomendedTags && <div className="space-y-1">
                <p className="text-xs opacity-50">Model: Mistral 7B Instruct</p>
                <div className="flex flex-wrap gap-1">
                    {recomendedTags?.map(tag => (
                        <Badge key={tag.id} variant="secondary">
                            {tag.name}
                        </Badge>
                    ))}
                </div>
                <Button size='sm' variant='outline' onClick={applyRecommendedTags}>Примінити</Button>
            </div>}
        </BaseBlock>
}