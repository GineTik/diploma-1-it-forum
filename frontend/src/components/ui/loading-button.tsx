import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./button";

export function LoadingButton({children, isLoading, ...props}: ButtonProps & {isLoading: boolean}) {
    return <Button {...props} disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" size={12} /> : children}
    </Button>
}