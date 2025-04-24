"use client"

import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
  type Icon,
} from "@tabler/icons-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavTags({
  items,
}: {
  items: {
    id: number,
    name: string
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Теги</SidebarGroupLabel>
      <SidebarMenu className="flex flex-wrap flex-row py-2">
        {items.map((item) => (
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
        <SidebarMenuButton className="text-sidebar-foreground/70">
          <IconDots className="text-sidebar-foreground/70" />
          <span>More</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  )
}
