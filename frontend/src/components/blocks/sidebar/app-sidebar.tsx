"use client"

import * as React from "react"
import {
  IconInnerShadowTop,
} from "@tabler/icons-react"

import { NavProfile } from "@/components/blocks/sidebar/nav-profile"
import { NavMain } from "@/components/blocks/sidebar/nav-main"
import { NavSecondary } from "@/components/blocks/sidebar/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSidebarItems } from "@/hooks/use-sidebar-items"
import { NavTags } from "@/components/blocks/sidebar/nav-tags"
import { useTags } from "@/hooks/tags/use-tags"
import { SignedIn } from "@clerk/nextjs"
import { ROUTES } from "@/contants/routes.constants"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = useSidebarItems();
  const {tags} = useTags();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href={ROUTES.HOME}>
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">IT Forum.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <SignedIn>
          <NavProfile items={data.documents} />
        </SignedIn>
        <NavTags items={tags} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  )
}
