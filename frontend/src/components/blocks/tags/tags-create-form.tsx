import { LoadingButton } from "@/components/ui/loading-button";
import { Input } from "@/components/ui/input";
import { useCreateTag } from "@/hooks/tags/use-create-tags";
import { useForm } from "react-hook-form";
import { CreateTagRequest, createTagSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@/components/ui/error-message";
import { useCallback } from "react";
import { useAuth } from "@clerk/nextjs";

export function TagsCreateForm() {
    const {createTag, isCreateTagPending} = useCreateTag();
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        defaultValues: {},
        resolver: zodResolver(createTagSchema),
    });
    const {isSignedIn} = useAuth()

    const submit = useCallback((data: CreateTagRequest) => {
        createTag(data);
        reset();
    }, [createTag, reset]);

    if (!isSignedIn) 
        return <></>;

    return (
        <div className="flex gap-2">
            <Input placeholder="Назва тегу" {...register("name")} />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            <LoadingButton 
                variant="default"
                isLoading={isCreateTagPending} 
                onClick={handleSubmit(submit)}>Додати</LoadingButton>
        </div>
    )
}