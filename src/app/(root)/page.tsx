import { getAllCourses } from "@/db/queries/actions";
import { auth } from "@/lib/auth";
import HomeView from "@/modules/home/views/home-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // console.log(session?.user?.role);

  if (!session) {
    redirect("/sign-in");
  }
  const courses = await getAllCourses();

  return <HomeView courses={courses} />;
};

export default Page;
