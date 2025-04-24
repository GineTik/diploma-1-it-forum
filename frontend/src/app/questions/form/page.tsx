'use client'

import PostFormBlock from "@/components/blocks/posts/post-form-block";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multiselect";
import { Textarea } from "@/components/ui/textarea";
import { useTags } from "@/hooks/tags/use-tags";
import { useTagsActions } from "@/hooks/tags/use-tags-actions";
import { Badge, Loader2, Sparkles } from "lucide-react";

export default function QuestionsFormPage() {
    const {tags, isTagsLoading} = useTags();
    const {recomendedTags, isRecommendTagsLoading, recommendTags} = useTagsActions();

    return (
        <div className="w-full max-w-[800px] mx-auto pt-5 px-5 space-y-3">
            <PostFormBlock>
                <h2 className="font-bold">Коротко напишіть суть питання</h2>
                <Input placeholder="Що таке React?" />
            </PostFormBlock>
            <PostFormBlock>
                <h2 className="font-bold">Опишіть ваше питання або проблему</h2>
                <p className="opacity-50 text-sm -mt-2">Використовуйте markdown для оформлення тексту</p>
                <Textarea placeholder="В мене є проблема з..." className="h-[200px]" />
            </PostFormBlock>
            <PostFormBlock>
                <h2 className="font-bold">Що ви вже пробували?</h2>
                <p className="opacity-50 text-sm -mt-2">Використовуйте markdown для оформлення тексту</p>
                <Textarea placeholder="Я вже викорисав..." className="h-[200px]" />
            </PostFormBlock>
            <PostFormBlock>
                <h2 className="font-bold">Додайте теги</h2>
                <div className="flex items-center gap-2">
                    {isTagsLoading ? <Loader2 className="animate-spin" size={12} /> : <MultipleSelector
                        defaultOptions={tags.map(tag => ({label: tag.name, value: tag.name}))} 
                        emptyIndicator={<p className="text-center text-sm">Тегів не знайдено</p>}
                        hidePlaceholderWhenSelected
                    />}
                    <Button variant="outline" size='icon' onClick={() => recommendTags(1)}>
                        {isRecommendTagsLoading
                            ? <Loader2 className="animate-spin" size={12} />
                            : <Sparkles size={12} />}
                    </Button>
                </div>
                <div>
                    {recomendedTags?.map(tag => (
                        <Badge key={tag.id}>{tag.name}</Badge>
                    ))}
                </div>
            </PostFormBlock>
            <div className="flex justify-end">
                <Button variant="default">Опублікувати</Button>
            </div>
        </div>
    )
}