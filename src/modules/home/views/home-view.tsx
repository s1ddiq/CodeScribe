"use client";

import { authClient } from "@/lib/auth-client";
import { Card, CardContent } from "@/components/ui/card";
import { useUserRole } from "@/hooks/use-user-role";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  const { isAdmin } = useUserRole();
  if (!session) return <div className="p-4 text-center">Loading...</div>;

  return (
    <>
      <main className="flex gap-6 p-6">
        <div className="max-w-7xl space-y-8">
          {/* Welcome Banner */}
          <Card className="rounded-2xl shadow-none border ">
            <CardContent className="p-6 space-y-2">
              <h2 className="text-2xl font-bold">
                Welcome Admin,{" "}
                <span className="text-primary capitalize">
                  {session?.user?.name}
                </span>
              </h2>
              <p className="text-muted-foreground">
                Ready to continue learning? Pick up where you left off or start
                something new.
              </p>
              {isAdmin && (
                <div>
                  <div className="flex justify-end">
                    <Link href="/admin">
                      <Button className="rounded-xl">+ Add Lesson</Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admin Controls */}

          {/* Courses Grid */}
        </div>
        <div className="max-w-2xl h-full space-y-8">
          <Card className="rounded-2xl shadow-none border h-full">
            <CardContent className="p-6 space-y-2">
              <h2 className="text-2xl font-bold">
                Welcome,{" "}
                <span className={isAdmin ? "text-primary capitalize" : ""}>
                  {session?.user?.name}
                </span>
              </h2>
              <p className="text-muted-foreground">
                Ready to continue learning? Pick up where you left off or start
                something new.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default HomeView;
