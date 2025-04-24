import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 pl-4 pr-1.5 lg:gap-2 lg:pl-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-2">
          <SignedOut>
            <Button variant="secondary" asChild>
              <SignInButton />
            </Button>
            <Button variant="default" asChild>
              <SignUpButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <div className="mt-1 mr-4 lg:mr-6">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
