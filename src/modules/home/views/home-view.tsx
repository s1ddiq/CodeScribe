"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  const router = useRouter();
  const { data: session } = authClient.useSession();
  // BASE END

  const { toggleSidebar } = useSidebar();

  if (!session || !courses) return <div>Loading...</div>;

  console.log(courses);
  return (
    // TODO 4 add accessibility aria labels and stuff, tab indexes and what not.
    <main className="p-4">
      <div className="space-y-4">
        <Card className="w-full rounded-xl p-6 shadow-none">
          <CardContent>
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
                <Card
                  key={id}
                  className="relative group rounded-xl border-2 border-primary  p-6 shadow-xl transition-transform duration-200 cursor-pointer"
                  onClick={() => router.push(`/courses/${slug}`)}
                >
                  <CardContent className="space-y-3">
                    <h2 className="text-2xl font-bold tracking-tight text-primary ">
                      {title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {description}
                    </p>
                    <div className="flex items-center justify-between pt-2 text-xs">
                      <span className="rounded-full bg-primary px-3 py-1 font-semibold text-primary-foreground">
                        {tech}
                      </span>
                      <span className="font-mono text-primary">
                        {lessonsCount} lessons
                      </span>
                    </div>
                  </CardContent>
                </Card>
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
