"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { MenuIcon, SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  const isMobile = useIsMobile();
  const { toggleSidebar, open, openMobile } = useSidebar();

  if (isMobile) {
    return (
      <div className="h-12 backdrop-blur-sm border-b border-sidebar-border px-3 flex items-center justify-between sticky top-0 z-9 ">
        <Image src="/logo-black.svg" width={24} height={24} alt="Logo" />
        <button className="p-2 rounded hover:bg-muted">
          {/* mobile menu icon */}
          <MenuIcon
            className={cn(
              "size-5 transition-rotate duration-300 ",
              openMobile && "rotate-90 -translate-y-24"
            )}
            onClick={toggleSidebar}
          />
        </button>
      </div>
    );
  }

  return (
    <div className="h-[53px] bg-sidebar-primary-foreground border-b border-sidebar-border p-2 flex items-center">
      {/* Desktop header content */}
      {open ? (
        <SidebarCloseIcon onClick={toggleSidebar} />
      ) : (
        <SidebarOpenIcon onClick={toggleSidebar} />
      )}
    </div>
  );
};

export default Navbar;
