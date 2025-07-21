import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/modules/dashboard/components/dashboard-sidebar";
import Navbar from "@/modules/navbar/components/navbar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col w-full min-h-screen bg-muted">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
  window.scrollTo({
    top: 0,
    behavior: "smooth", // or 'auto' for instant
  });
};

export default Layout;
