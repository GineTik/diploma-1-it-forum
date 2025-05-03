import { ErrorMessage } from "../ui/error-message";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import PostFormBlock from "./post-form-block";
import { forwardRef } from "react";

export function BaseBlock({children, title, error}: {children: React.ReactNode, title: string, error: string | undefined}) {
    return <PostFormBlock>
        <h2 className="font-bold">{title}</h2>
        {children}
        {error && <ErrorMessage>{error}</ErrorMessage>}
    </PostFormBlock>
}

type InputBlockProps = React.ComponentProps<"input"> & {
    title: string;
    error: string | undefined;
}

export const InputBlock = forwardRef<HTMLInputElement, InputBlockProps>(({title, error, ...props}, ref) => {
    return <BaseBlock title={title} error={error}>
        <Input {...props} ref={ref} />
    </BaseBlock>
})

InputBlock.displayName = "InputBlock";

type TextareaBlockProps = React.ComponentProps<"textarea"> & {
    title: string;
    description?: string;
    error: string | undefined;
}

export const TextareaBlock = forwardRef<HTMLTextAreaElement, TextareaBlockProps>(({title, error, description, ...props}, ref) => {
    return <BaseBlock title={title} error={error}>
        {description && <p className="opacity-50 text-sm -mt-2">{description}</p>}
        <Textarea {...props} ref={ref} />
    </BaseBlock>
})

TextareaBlock.displayName = "TextareaBlock";