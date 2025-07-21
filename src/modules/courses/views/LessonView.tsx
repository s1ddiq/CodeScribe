"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function LessonView({
  course,
  lessons,
}: {
  course: any;
  lessons: any[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextLesson = () => {
    setCurrentIndex((prev) => (prev < lessons.length - 1 ? prev + 1 : prev));
  };

  const prevLesson = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const currentLesson = lessons[currentIndex];
  return (
    <div className="p-4">
      {/* LESSON CONTAINER */}
      <Button onClick={prevLesson} disabled={currentIndex === 0}>
        <ArrowLeft />
        Back
      </Button>
      <div className="p-4 min-h-screen flex flex-col">
        <h1 className="text-xs font-light text-muted-foreground">
          {course.title}
        </h1>
        <div className="p-3 rounded flex-1">
          <h2 className="text-xl font-semibold">{currentLesson.title}</h2>
          <div className="mt-2">{currentLesson.content}</div>
        </div>

        <div className="flex justify-between mt-auto pt-4">
          <Button
            onClick={nextLesson}
            disabled={currentIndex === lessons.length - 1}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
