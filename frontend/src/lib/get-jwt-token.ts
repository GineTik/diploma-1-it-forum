import { Clerk } from "@clerk/clerk-js";

export const getJwtToken = async () => {
    const clerk = new Clerk(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!);
    await clerk.load();
    return await clerk.session?.getToken();
}