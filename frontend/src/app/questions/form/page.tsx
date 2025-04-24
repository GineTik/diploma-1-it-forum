'use client'

import PostFormBlock from "@/components/blocks/posts/post-form-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultipleSelector, { MultiselectOption } from "@/components/ui/multiselect";
import { Textarea } from "@/components/ui/textarea";
import { usePostsActions } from "@/hooks/posts/use-posts-actions";
import { useTags } from "@/hooks/tags/use-tags";
import { useTagsActions } from "@/hooks/tags/use-tags-actions";
import { Tag } from "@/types/tags.type";
import { Loader2, Send, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function QuestionsFormPage() {
    const {tags, isTagsLoading} = useTags();
    const {recomendedTags, isRecommendTagsLoading, recommendTags, resetRecommendTags} = useTagsActions();
    const {createQuestion, isCreatingQuestion, createQuestionError} = usePostsActions();
    const form = useForm({
        defaultValues: {
            title: '',
            contentProblem: '',
            contentTried: '',
            tags: [] as Tag[],
        },
    });

    const applyRecommendedTags = useCallback(() => {
        form.setValue('tags', parseOptionsToTags(parseTagsToOptions(recomendedTags)));
        resetRecommendTags();
    }, [recomendedTags]);

    const parseTagsToOptions = useCallback((tags: Tag[]): MultiselectOption[] => {
        return tags.map(tag => ({label: tag.name, value: tag.name}));
    }, []);
    
    const parseOptionsToTags = useCallback((options: MultiselectOption[]): Tag[] => {
        return options.map(option => tags.find(tag => tag.name === option.value)).filter(tag => tag !== undefined);
    }, [tags]);

    const submitPost = useCallback(() => {
        createQuestion({
            title: form.getValues('title'),
            content: form.getValues('contentProblem') + form.getValues('contentTried'),
            tags: form.getValues('tags').map(tag => tag.id),
        });
    }, [form]);

    return (
        <div className="w-full max-w-[800px] mx-auto pt-5 px-5 space-y-3">
            <PostFormBlock>
                <h2 className="font-bold">Коротко напишіть суть питання</h2>
                <Input placeholder="Що таке React?" {...form.register('title')} />
            </PostFormBlock>
            <PostFormBlock>
                <h2 className="font-bold">Опишіть ваше питання або проблему</h2>
                <p className="opacity-50 text-sm -mt-2">Використовуйте markdown для оформлення тексту</p>
                <Textarea placeholder="В мене є проблема з..." className="h-[200px]" {...form.register('contentProblem')} />
            </PostFormBlock>
            <PostFormBlock>
                <h2 className="font-bold">Що ви вже пробували?</h2>
                <p className="opacity-50 text-sm -mt-2">Використовуйте markdown для оформлення тексту</p>
                <Textarea placeholder="Я вже викорисав..." className="h-[200px]" {...form.register('contentTried')} />
            </PostFormBlock>
            <PostFormBlock>
                <h2 className="font-bold">Додайте теги</h2>
                <div className="flex items-center gap-2">
                    {isTagsLoading ? <Loader2 className="animate-spin" size={12} /> : <MultipleSelector
                        defaultOptions={parseTagsToOptions(tags)}
                        emptyIndicator={<p className="text-center text-sm">Тегів не знайдено</p>}
                        hidePlaceholderWhenSelected
                        value={parseTagsToOptions(form.getValues('tags'))}
                        onChange={(tags) => form.setValue('tags', parseOptionsToTags(tags))}
                    />}
                    <Button variant="outline" size='icon' onClick={() => recommendTags(form.getValues('title'), form.getValues('contentProblem') + form.getValues('contentTried'))}>
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
            </PostFormBlock>
            <div className="flex justify-end" onClick={submitPost}>
                <Button variant="default" className="flex items-center">
                    {isCreatingQuestion ? <Loader2 className="animate-spin" size={12} /> : 'Опублікувати'}
                </Button>
            </div>
        </div>
    )
}