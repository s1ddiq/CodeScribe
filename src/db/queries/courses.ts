"use server";
import { db } from "..";
import { learningSchema } from "../schema";

export const getAllCourses = async () => {
  const allCourses = await db.select().from(learningSchema.courses);
  return allCourses;
};
