"use client";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent } from "@/components/ui/card";
import CourseCard from "../components/CourseCard";
import { useUserRole } from "@/hooks/use-user-role";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  const { role, isAdmin } = useUserRole();

  if (!session || !courses) return <div>Loading...</div>;

  return (
    // TODO 4 add accessibility aria labels and stuff, tab indexes and what not.
    <main className="p-4">
      <div className="space-y-4">
        <Card className="w-full rounded-xl p-4 shadow-none">
          <CardContent className="p-0">
            <p className="font-medium text-xl text-foreground capitalize">
              Welcome back,{" "}
              <span className={`${isAdmin && "text-primary"}`}>
                {session?.user?.name}
              </span>
            </p>
            <p className="text-muted-foreground ">
              Continue where you left off or explore something new.
            </p>
          </CardContent>
        </Card>

        {isAdmin && (
          <section className="space-y-2">
            <Link href="/admin">
              <Button>Add Course</Button>
            </Link>
          </section>
        )}
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
