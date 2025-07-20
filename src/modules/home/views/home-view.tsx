"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";

export const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  // BASE END

  const { toggleSidebar } = useSidebar();

  if (!session) return <div>Loading...</div>;
  return (
    <main>
      <h1>Hello, {session.user.name}</h1>
      <Button
        onClick={() =>
          authClient.signOut(
            {},
            {
              onSuccess: () => {
                router.replace("/sign-in");
              },
              onError: (err) => {
                console.error("Sign out failed:", err);
              },
            }
          )
        }
      >
        Sign out
      </Button>

      <Button onClick={toggleSidebar}>toggle</Button>
    </main>
  );
};

export default HomeView;
