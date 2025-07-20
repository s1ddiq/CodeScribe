import { db } from "@/db";
import { learningSchema } from "@/db/schema";
import { nanoid } from "nanoid";

async function seed() {
  const { courses, lessons } = learningSchema;

  const courseId = nanoid();

  await db.insert(courses).values({
    id: courseId,
    title: "Intro to Next.js",
    description: "A beginner-friendly course to get started with Next.js.",
    slug: "intro-to-nextjs",
    tech: "Next.js",
    thumbnailUrl: "https://placehold.co/600x400",
    lessonsCount: 3,
  });

  await db.insert(lessons).values([
    {
      id: nanoid(),
      courseId,
      title: "Lesson 1: Setup",
      slug: "lesson-1-setup",
      order: 1,
      content: "# Welcome to Lesson 1\nLet's start with Next.js setup!",
    },
    {
      id: nanoid(),
      courseId,
      title: "Lesson 2: Pages",
      slug: "lesson-2-pages",
      order: 2,
      content: "# Lesson 2\nLearn how to create pages in Next.js.",
    },
    {
      id: nanoid(),
      courseId,
      title: "Lesson 3: Deployment",
      slug: "lesson-3-deployment",
      order: 3,
      content: "# Lesson 3\nHow to deploy your Next.js app.",
    },
  ]);

  console.log("Seeding complete!");
}

seed();
