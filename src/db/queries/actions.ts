"use server";
import { and, eq, asc, sql } from "drizzle-orm";
import { db } from "..";
import { courses, lessons, userCourses } from "../schema";
import { nanoid, random } from "nanoid";
import { randomUUID } from "crypto";

export const getAllCourses = async () => {
  const allCourses = await db.select().from(courses);
  return allCourses;
};

export const startCourse = async (userId: string, courseId: string) => {
  // Check if user already started this course.
  const existing = await db.query.userCourses.findFirst({
    where: and(
      eq(userCourses.userId, userId),
      eq(userCourses.courseId, courseId)
    ),
  });

  if (existing) return existing;

  // Otherwise, create a new record
  const [newRecord] = await db
    .insert(userCourses)
    .values({
      id: nanoid(),
      userId,
      courseId,
      progress: 0,
      currentLesson: 0,
      completedLessons: [],
    })
    .returning();

  return newRecord;
};

export const getLessonForCourse = async (courseId: string) => {
  const courseLessons = await db
    .select()
    .from(lessons)
    .where(eq(lessons.courseId, courseId))
    .orderBy(asc(lessons.order)); // sort by ascending, change later

  return courseLessons;
};

export async function getLessonsByCourseSlug(slug: string) {
  // Find the course by its slug
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, slug),
  });

  if (!course) {
    throw new Error(`Course with slug "${slug}" not found`);
  }

  // Fetch lessons for the course, ordered by `order`
  const courseLessons = await db
    .select()
    .from(lessons)
    .where(eq(lessons.courseId, course.id))
    .orderBy(asc(lessons.order));

  // Return strongly typed data
  return {
    course: {
      id: course.id,
      title: course.title,
      slug: course.slug,
      tech: course.tech,
    },
    lessons: courseLessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      content: lesson.content,
      videoUrl: lesson.videoUrl,
      order: lesson.order,
    })),
  };
}
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function addLesson(
  title: string,
  content: string,
  courseId: string,
  videoUrl?: string
) {
  if (!title.trim()) throw new Error("Lesson title is required");
  if (!content.trim()) throw new Error("Lesson content is required");
  if (!courseId.trim()) throw new Error("Course ID is required");

  // Check course exists
  const course = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });
  if (!course) throw new Error(`No course found with ID: ${courseId}`);

  // Determine next order
  const [{ maxOrder }] = await db
    .select({ maxOrder: sql<number>`COALESCE(MAX("order"), 0)` })
    .from(lessons)
    .where(eq(lessons.courseId, courseId));

  const nextOrder = (maxOrder ?? 0) + 1;

  // Insert lesson
  const [newLesson] = await db
    .insert(lessons)
    .values({
      courseId,
      title,
      slug: slugify(title),
      order: nextOrder,
      content,
      videoUrl,
    })
    .returning();

  return newLesson;
}
/*
"use server";

import { db } from "@/db";
import { userCourses } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function startCourse(userId: string, courseId: string) {
  // Check if user already started this course
  const existing = await db.query.userCourses.findFirst({
    where: and(
      eq(userCourses.userId, userId),
      eq(userCourses.courseId, courseId)
    ),
  });

  if (existing) return existing;

  // Otherwise, create new record
  const [newRecord] = await db.insert(userCourses).values({
    id: nanoid(),
    userId,
    courseId,
    progress: 0,
    currentLesson: 0,
    completedLessons: [],
  }).returning();

  return newRecord;
}
 */
