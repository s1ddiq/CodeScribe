"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { estimateDuration } from "@/lib/utils";
import CourseCard from "../components/CourseCard";
import { useEffect } from "react";
import { useUserRole } from "@/hooks/use-user-role";

interface HomeViewProps {
  courses: {
    id: string;
    title: string;
    description: string | null;
    slug: string;
    tech: string | null;
    thumbnailUrl: string | null;
    lessonsCount: number | null;
    createdAt: Date;
  }[];
}

export const HomeView = ({ courses }: HomeViewProps) => {
  const { data: session } = authClient.useSession();
  const { role, loading, error } = useUserRole();
  console.log(role);

  if (!session || !courses) return <div>Loading...</div>;

  return (
    // TODO 4 add accessibility aria labels and stuff, tab indexes and what not.
    <main className="p-4">
      <div className="space-y-4">
        <Card className="w-full rounded-xl p-4 shadow-none">
          <CardContent className="p-0">
            <p className="font-medium text-xl text-foreground">
              Welcome back, {session?.user?.name}
            </p>
            <p className="text-muted-foreground ">
              Continue where you left off or explore something new.
            </p>
          </CardContent>
        </Card>

        <section className="space-y-2">
          <h1 className="text-2xl font-semibold">Browse Courses</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(
              ({ id, title, description, tech, slug, lessonsCount }) => (
                <CourseCard
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  tech={tech}
                  slug={slug}
                  lessonsCount={lessonsCount}
                />
              )
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomeView;

{
  /* <h1>Hello, {session.user.name}</h1>
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

<Button onClick={toggleSidebar}>toggle</Button> */
}
