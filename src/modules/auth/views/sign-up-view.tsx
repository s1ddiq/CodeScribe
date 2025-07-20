"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email(),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string().min(1, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpView = () => {
  const router = useRouter();
  const { session } = authClient.useSession() as any;
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(false);
    setPending(true);

    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          // setError();
          setPending(false);
        },
      }
    );
  };

  if (session) redirect("/");

  return (
    <div className="flex h-screen | justify-center items-center p-4">
      <Card className="md:max-w-3xl max-w-2xl w-full p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div>
            <FormProvider {...form}>
              <form
                className="space-y-6 p-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col items-center text-center">
                    <p className="text-2xl font-bold">Let&apos;s get started</p>
                    <p className="text-muted-foreground text-balance">
                      Create your account
                    </p>
                  </div>

                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              type="name"
                              placeholder="e.g. John Doe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="********"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Retype password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button disabled={pending} className="w-full">
                  Sign up
                </Button>

                {/* TODO 1: Add `or continue with` */}
                <Link
                  href="/sign-in"
                  className="w-full flex justify-center text-muted-foreground"
                >
                  Already have an account?
                  <span className="ml-2 text-primary underline underline-offset-2">
                    Sign Up
                  </span>
                </Link>
              </form>
            </FormProvider>
          </div>

          {/*           RIGHT              */}

          <div className="flex flex-col justify-center items-center bg-radial from-primary to-blue-600 via-45% m-4 md:m-0 sm:rounded-r-xl rounded-xl md:p-0 p-2">
            <Image
              src="/logo-white.svg"
              width={64}
              height={64}
              className="md:!w-[92px] !w-[56px]"
              alt="Logo"
            />
            <p className="text-xl font-bold text-white">CodeScribe</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpView;
