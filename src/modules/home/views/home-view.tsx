"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then((res) => {
      console.log("Session:", res.data);
      setSession(res.data);
    });
  }, []);

  if (!session) return <div>Loading...</div>;

  return (
    <main>
      <h1>Hello, {session?.user?.firstName}</h1>
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
    </main>
  );
};

export default HomeView;
