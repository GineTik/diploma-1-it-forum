import { PostResponse, UpdateQuestionFormData, updateQuestionSchema } from "@/types/posts.types";
import { useUpdatePost } from "@/hooks/posts/use-posts-actions";
import { useCallback, Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { InputBlock, TextareaBlock } from "../../form-block";

type QuestionEditableContentProps = {
    post: PostResponse;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export function QuestionEditableContent({post, setIsEditing}: QuestionEditableContentProps) {
    const {updatePost, isUpdatingPost} = useUpdatePost(post.id)
    
    const submitPost = useCallback((data: UpdateQuestionFormData) => {
        updatePost({
            ...data,
            tags: data.tags.map(tag => tag.id)
        })
        setIsEditing(false);
    }, [updatePost, setIsEditing]);

    const {register, handleSubmit, formState: {errors}} = useForm<UpdateQuestionFormData>({
        defaultValues: post ?? {},
        resolver: zodResolver(updateQuestionSchema)
    });

    return (
        <div className="space-y-3">
            <InputBlock 
                title="Назва питання" 
                error={errors.title?.message}
                {...register('title')} />
            <TextareaBlock 
                title="Опишіть ваше питання або проблему" 
                description="Використовуйте markdown для оформлення тексту"
                error={errors.content?.message}
                className="min-h-[200px]"
                {...register('content')} />

            <div className="flex justify-end">
                <Button variant="default" className="flex items-center" onClick={handleSubmit(submitPost)}>
                    {isUpdatingPost ? <Loader2 className="animate-spin" size={12} /> : 'Зберегти'}
                </Button>
            </div>
        </div>
    )
}