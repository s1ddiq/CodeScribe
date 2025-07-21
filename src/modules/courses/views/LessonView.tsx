"use client";
import MarkdownRender from "@/components/markdown-render";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

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
    <div className="p-2">
      {/* LESSON CONTAINER */}

      <div className="flex justify-between w-full items-center">
        <Button onClick={prevLesson} disabled={currentIndex === 0}>
          <ArrowLeft />
          Back
        </Button>
        <Button
          onClick={nextLesson}
          disabled={currentIndex === lessons.length - 1}
        >
          Next <ArrowRight />
        </Button>
      </div>
      <div className="p-4 min-h-screen flex flex-col">
        <h1 className="text-xs font-light text-muted-foreground">
          {course.title}
        </h1>
        <div className="p-3 rounded flex-1">
          <h2 className="text-xl font-semibold">{currentLesson.title}</h2>
          <MarkdownRender content={currentLesson.content} />
        </div>

        <div className="flex justify-between mt-auto pt-4"></div>
      </div>
    </div>
  );
}
