import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "./lib/utils";

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
import { useState } from "react";

const formSchema = z.object({
  username: z
    .string()
    .min(2)
    .max(23)
    .regex(/^[a-zA-Z][a-zA-Z0-9-_]/),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(24)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%])/,
      "Password must contain one special character",
    ),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setSuccess(true);
    console.log(values);
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen bg-primary items-center flex">
      <div
        className={cn(
          "bg-slate-300 max-w-xl mx-auto md:max-w-5xl flex-1 p-10 rounded-lg",
        )}
      >
        {success ? (
          <div>success !!!</div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mx-10"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
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
                        placeholder="joe@mail.com"
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
                  <FormItem className="flex justify-between relative">
                    <div className="w-full space-y-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="enter password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                    <button
                      onClick={toggleShowPassword}
                      className="h-full mr-5 pt-6 absolute md:w-5 w-4 cursor-pointer right-0 pb-3"
                      type="button"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="text-slate-400" />
                      ) : (
                        <Eye />
                      )}
                    </button>
                  </FormItem>
                )}
              />
              <Button className="mt-10" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
