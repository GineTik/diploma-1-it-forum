import { Button } from "@/components/ui/button";
import MultipleSelector, { MultiselectOption } from "@/components/ui/multiselect";
import { useRecommendTags } from "@/hooks/tags/use-recommend-tags";
import { useTags } from "@/hooks/tags/use-tags";
import { QuestionFormData } from "@/types/posts.types";
import { TagResponse } from "@/types/tags.type";
import { Loader2, Sparkles } from "lucide-react";
import { useCallback } from "react";
import { FieldErrors } from "react-hook-form";
import { BaseBlock } from "../../form-block";
import { Badge } from "@/components/ui/badge";

type QuestionTagsBlockProps = {
    errors: FieldErrors<QuestionFormData>;
    getTags: () => TagResponse[];
    setValue: (name: keyof QuestionFormData, value: TagResponse[]) => void;
    getTitle: () => string;
    getContent: () => string;
}

export function QuestionTagsBlock({errors, getTags, setValue, getTitle, getContent}: QuestionTagsBlockProps) {
    const {tags, isTagsLoading} = useTags();
    const {recomendedTags, isRecommendTagsLoading, recommendTags, resetRecommendTags} = useRecommendTags();

    const parseTagsToOptions = useCallback((tags: TagResponse[]): MultiselectOption[] => {
        return tags?.map(tag => ({label: tag.name, value: tag.name})) ?? [];
    }, []);
    
    const parseOptionsToTags = useCallback((options: MultiselectOption[]): TagResponse[] => {
        return options?.map(option => tags.find(tag => tag.name === option.value)).filter(tag => tag !== undefined) ?? [];
    }, [tags]);

    const applyRecommendedTags = useCallback(() => {
        setValue('tags', recomendedTags ?? []);
        resetRecommendTags();
    }, [recomendedTags, setValue, resetRecommendTags]);

    return <BaseBlock title="Додайте теги" error={errors.tags?.message}>
        <div className="flex items-center gap-2">
            {isTagsLoading ? <Loader2 className="animate-spin" size={12} /> : <MultipleSelector
                defaultOptions={parseTagsToOptions(tags)}
                emptyIndicator={<p className="text-center text-sm">Тегів не знайдено</p>}
                hidePlaceholderWhenSelected
                value={parseTagsToOptions(getTags())}
                onChange={(tags) => setValue('tags', parseOptionsToTags(tags))}
            />}
            <Button variant="outline" size='icon' onClick={() => recommendTags(getTitle(), getContent())}>
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