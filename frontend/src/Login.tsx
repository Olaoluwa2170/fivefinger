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
import { FC, useRef, useState } from "react";
import axios from "./api/axios";

const formSchema = z.object({
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

const LOGIN_URL = "/auth/sign-in";

const Login: FC = () => {
  const errRef = useRef<HTMLParagraphElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(
        LOGIN_URL,
        { ...values },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log(response.data);
      console.log(response.data.accessToken);
      setSuccess(true);
    } catch (error: any) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error?.response?.status === 409) {
        setErrMsg("Email Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current?.focus();
    }
    console.log(values);
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="w-full flex-col h-screen justify-center bg-primary items-center flex">
      <h1 className="text-white text-2xl mb-5">Welcome Back !!</h1>
      <div className={cn("bg-slate-300 max-w-[350px] mx-auto p-10 rounded-lg")}>
        <div
          className={cn("mb-5 p-3 bg-destructive rounded-lg", {
            // eslint-disable-next-line prettier/prettier
            'hidden': !errMsg,
          })}
        >
          <p ref={errRef}>{errMsg}</p>
        </div>
        {success ? (
          <div>success !!!</div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="off"
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
                      className={cn(
                        "mr-5 pt-6 absolute md:w-5 w-4 bottom-0 top-2 cursor-pointer right-0 pb-3",
                        {
                          // eslint-disable-next-line prettier/prettier
                          'bottom-11' : form.formState.errors.password,
                        },
                      )}
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
    </section>
  );
};

export default Login;
