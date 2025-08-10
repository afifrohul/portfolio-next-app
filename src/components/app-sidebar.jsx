"use client";

import {
  CogIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  TableOfContentsIcon,
  UserCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavUser } from "@/components/nav-user";
import Image from "next/image";
import { useTheme } from "next-themes";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "About",
    url: "/about",
    icon: UserCircleIcon,
  },
  {
    title: "Education",
    url: "/education",
    icon: GraduationCapIcon,
  },
  {
    title: "Experience",
    url: "/experience",
    icon: TableOfContentsIcon,
  },
  {
    title: "Skill",
    url: "/skill",
    icon: CogIcon,
  },
];

export function AppSidebar({ user }) {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <Image
                  src={theme === "dark" ? "/afif-light.svg" : "/afif.svg"}
                  width={18}
                  height={18}
                  alt="logo"
                ></Image>
                <span className="text-base font-semibold">Afif Rohul.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Master Data</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === `/admin${item.url}`;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={`/admin${item.url}`}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
