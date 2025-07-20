import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/modules/dashboard/components/dashboard-sidebar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col w-full min-h-screen bg-muted">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
