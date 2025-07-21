"use client";
import MarkdownRender from "@/components/markdown-render";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function LessonView({
  course,
  lessons,
}: {
  course: any;
  lessons: any[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto", // or 'auto' for instant
    });
  }, [currentIndex]);
  const nextLesson = () => {
    setCurrentIndex((prev) => (prev < lessons.length - 1 ? prev + 1 : prev));
  };

  const prevLesson = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const currentLesson = lessons[currentIndex];
  return (
    <div className="p-2">
      {/* LESSON CONTAINER */}

      <div className="flex justify-between w-full items-center">
        <Button onClick={prevLesson} disabled={currentIndex === 0}>
          <ArrowLeft />
          Back
        </Button>
      </div>
      <div className="p-4 min-h-screen flex flex-col">
        <span className="text-xs font-light text-muted-foreground">
          <p className="inline mr-2">{currentLesson.order}</p>
          {course.title}
        </span>
        <div className="p-3 rounded flex-1">
          <h2 className="text-xl font-semibold" id="lesson-title">
            {currentLesson.title}
          </h2>
          <MarkdownRender content={currentLesson.content} />

          {/* {currentLesson.videoUrl && (
            <iframe
              width="420"
              height="315"
              src={currentLesson.videoUrl}
            ></iframe>
          )} */}
          {/* TODO 5 add embed video */}
        </div>

        <div className="flex justify-between mt-auto pt-4">
          <Button
            onClick={nextLesson}
            className="md:w-auto w-full"
            disabled={currentIndex === lessons.length - 1}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
