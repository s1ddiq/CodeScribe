import { pgTable, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const courses = pgTable("courses", {
  id: text("id").primaryKey(), // can use uuid
  title: text("title").notNull(),
  description: text("description"),
  slug: text("slug").notNull().unique(),
  tech: text("tech"),
  thumbnailUrl: text("thumbnail_url"),
  lessonsCount: integer("lessons_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const lessons = pgTable("lessons", {
  id: text("id").primaryKey(),
  courseId: text("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  order: integer("order").notNull(),
  content: text("content").notNull(),
  videoUrl: text("video_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userCourses = pgTable("user_courses", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  courseId: text("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  progress: integer("progress").default(0),
  currentLesson: integer("current_lesson").default(0),
  completedLessons: jsonb("completed_lessons").$type<string[]>().default([]),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
