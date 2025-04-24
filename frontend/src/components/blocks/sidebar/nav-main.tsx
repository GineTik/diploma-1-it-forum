"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { ROUTES } from "@/contants/routes.constants"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-col items-center gap-2">
            <Button
              variant="default"
              className="w-full"
              asChild
            >
              <Link href={ROUTES.QUESTIONS_FORM}>
                <IconCirclePlusFilled />
                <span>Задати питання</span>
              </Link>
            </Button>
            <Button
              className="w-full group-data-[collapsible=icon]:opacity-0"
              variant="outline"
              asChild
            >
              <Link href={ROUTES.ARTICLES_FORM}>
                <IconMail />
                <span>Написати статтю</span>
              </Link>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
