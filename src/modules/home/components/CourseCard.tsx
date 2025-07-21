"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { estimateDuration } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { startCourse } from "@/db/queries/actions";

const CourseCard = ({
  id,
  slug,
  title,
  description,
  tech,
  lessonsCount,
}: any) => {
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const handleStart = async () => {
    await startCourse(session?.user?.id ?? "", id);
  };
  return (
    <Card
      key={id}
      className="relative rounded-xl p-2 transition-transform duration-200 cursor-pointer shadow-none"
      onClick={() => router.push(`/courses/${slug}`)}
    >
      <CardContent className="space-y-3 p-2">
        <h2 className="text-2xl font-bold tracking-tight text-primary ">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between pt-2 text-xs">
          <span className="rounded bg-primary px-3 py-1 font-semibold text-primary-foreground">
            {tech}
          </span>
          <span className="text-sm text-primary">
            {estimateDuration(Number(lessonsCount))} to complete
          </span>
        </div>
        <div className="border-t text-xs text-muted-foreground pt-4">
          Certification on completion
        </div>
        <Button className="w-full" onClick={handleStart}>
          Start course
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
