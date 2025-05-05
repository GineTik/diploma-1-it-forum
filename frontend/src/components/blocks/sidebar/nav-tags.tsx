"use client"

import {
  IconDots,
  IconList,
  IconPlus,
} from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { ROUTES } from "@/contants/routes.constants"

export function NavTags({
  items,
}: {
  items: {
    id: number,
    name: string
  }[]
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Теги</SidebarGroupLabel>
      <SidebarMenu className="flex flex-wrap flex-row py-2">
        {items?.map((item) => (
          <SidebarMenuItem key={item.id} className="">
            <SidebarMenuButton asChild>
              <span className="text-sm max-h-8 inline cursor-pointer px-2">
                <span>{item.name}</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton className="text-sidebar-foreground/70" asChild>
          <Link href={ROUTES.TAGS}>
            <IconList className="text-sidebar-foreground/70" />
            <span>Усі теги</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  )
}
