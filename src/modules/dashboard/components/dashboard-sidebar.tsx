import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GraduationCap, Home, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DashboardUserButton from "../ui/dashboard-user-button";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "My Learning", url: "/my-learning", icon: GraduationCap },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

const DashboardSidebar = () => {
  return (
    <Sidebar className="flex flex-col w-64 h-screen border-r bg-background">
      <SidebarHeader className="px-4 py-3 border-b">
        <div className="flex gap-2 items-center">
          <Image src="/logo-black.svg" width={32} height={32} alt="Logo" />
          <h2 className="text-lg font-semibold">Codescribe</h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground uppercase">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2">
              {items.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <Link
                    href={url}
                    className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Icon size={18} />
                    <span>{title}</span>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-3 border-t text-sm text-muted-foreground">
        {/* TODO 3 completed | Turn into components */}
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
