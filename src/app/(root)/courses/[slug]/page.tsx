import { getLessonsByCourseSlug } from "@/db/queries/actions";
import LessonView from "@/modules/courses/views/LessonView";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getLessonsByCourseSlug(slug);

  if (!data || !data.course || !data.lessons?.length) {
    return <div className="p-6">Course not found or no lessons available</div>;
  }

  return <LessonView course={data.course ?? []} lessons={data.lessons} />;
}
