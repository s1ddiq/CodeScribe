import { getLessonsByCourseSlug } from "@/db/queries/actions";
import LessonView from "@/modules/courses/views/LessonView";

const Page = async ({ params }: { params: { slug: string } }) => {
  const data = await getLessonsByCourseSlug(params.slug);

  if (!data) {
    return <div className="p-6">Course not found</div>;
  }

  return <LessonView course={data.course} lessons={data.lessons} />;
};

export default Page;
