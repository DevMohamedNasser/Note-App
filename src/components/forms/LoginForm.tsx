"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/src/interfaces/LoginForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchemaType } from "../../interfaces/LoginForm.schema";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {

  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchemaType) {
    // console.log(values);
    const res = await signIn("credentials", {
      ...values,
      redirect: false,
      callbackUrl: "/",
    });
    // console.log(res);
    if (res?.ok) {
      toast.success('Login successfully!');
      // router.push('/');
      router.refresh();
    } else {
      toast.error(res?.error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Email</FormLabel>
              <FormControl>
                <Input placeholder="user@gmail.com" {...field} />
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
              <FormLabel>User Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <Button type="submit">Submit</Button>
          <p>
            {`U don't have an account?`}{" "}
            <Link href={"/register"} className="text-blue-700 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
