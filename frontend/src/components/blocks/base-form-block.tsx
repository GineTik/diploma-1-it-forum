import { ErrorMessage } from "../ui/error-message";
import PostFormBlock from "./post-form-block";

export function BaseBlock({children, title, error}: {children: React.ReactNode, title: string, error: string | undefined}) {
    return <PostFormBlock>
        <h2 className="font-bold">{title}</h2>
        {children}
        {error && <ErrorMessage>{error}</ErrorMessage>}
    </PostFormBlock>
}