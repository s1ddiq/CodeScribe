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
    <div className="flex h-screen | justify-center items-center">
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
                              type="confirmPassword"
                              placeholder="********"
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

                {/* TODO: Add `or continue with` */}
              </form>
            </FormProvider>
          </div>

          {/*           RIGHT              */}

          <div className="flex justify-center items-center bg-radial from-primary to-blue-600 via-45% rounded-r-2xl">
            <Image
              src="/logo-white.svg"
              width={64}
              height={64}
              className="!w-[92px]"
              alt="Logo"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpView;
