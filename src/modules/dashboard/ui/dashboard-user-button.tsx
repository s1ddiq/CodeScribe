"use client";
import GeneratedAvatar from "@/components/generated-avatar";
import { authClient } from "@/lib/auth-client";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const DashboardUserButton = () => {
  const { data: session } = authClient.useSession();
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <GeneratedAvatar
              seed={session?.user?.name ?? "Guest"}
              variant="botttsNeutral"
            />

            <div className="flex gap-2 items-center justify-between w-full">
              <span>
                <p className="truncate font-medium">
                  {session?.user?.name ?? "Guest"}
                </p>
                <p className="text-xs font-medium">
                  {session?.user?.email ?? "No email"}
                </p>
              </span>

              <ChevronDownIcon className="shrink-0" />
            </div>
          </div>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>My Account</DrawerTitle>
            <DrawerDescription>Manage your account settings</DrawerDescription>
          </DrawerHeader>

          <div className="p-4 flex flex-col gap-2">
            <Button variant="ghost" className="justify-start">
              Profile
            </Button>
            <Button variant="ghost" className="justify-start">
              Billing
            </Button>
            <Button variant="ghost" className="justify-start">
              Team
            </Button>
            <Button variant="ghost" className="justify-start">
              Subscription
            </Button>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-left">
        <div className="flex items-center gap-2">
          <GeneratedAvatar
            seed={session?.user.name ?? "Guest"}
            variant="botttsNeutral"
          />

          <div className="flex gap-2 items-center justify-between w-full cursor-pointer">
            <span>
              <p className="truncate font-medium capitalize">
                {session?.user.name}
              </p>
              <p className=" text-xs font-medium">{session?.user?.email}</p>
            </span>

            <ChevronDownIcon className="shrink-0" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;
