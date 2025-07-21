"use server";
import { and, eq, asc } from "drizzle-orm";
import { db } from "..";
import { courses, lessons, userCourses } from "../schema";
import { nanoid } from "nanoid";

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
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, slug),
  });

  if (!course) return null;

  const courseLessons = await db
    .select()
    .from(lessons)
    .where(eq(lessons.courseId, course.id))
    .orderBy(asc(lessons.order));

  return { course, lessons: courseLessons };
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
