import { getAllCourses } from "@/db/queries/courses";
import { auth } from "@/lib/auth";
import HomeView from "@/modules/home/views/home-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const courses = await getAllCourses();

  if (!session) {
    redirect("/sign-in");
  }

  return <HomeView courses={courses} />;
};

export default Page;
