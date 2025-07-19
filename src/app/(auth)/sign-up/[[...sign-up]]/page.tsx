import SignUpView from "@/modules/auth/views/sign-up-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/"); // already logged in → go to home
  }
  return <SignUpView />;
};

export default Page;
