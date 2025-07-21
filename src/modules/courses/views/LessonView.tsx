export default function LessonView({
  course,
  lessons,
}: {
  course: any;
  lessons: any[];
}) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <ul className="space-y-2 mt-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="p-3 border rounded w-full h-screen">
            {lesson.title}
            {lesson.content}
          </div>
        ))}
      </ul>
    </div>
  );
}
