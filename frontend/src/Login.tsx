import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "./lib/utils";

import { FC, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "./api/axios";
import { setAuth } from "./app/authSlice";
import { useAppDispatch } from "./app/hooks/hooks";
import { Button } from "./components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import useInput from "./hooks/useInput";
import useToggle from "./hooks/useToggle";

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
  const dispatch = useAppDispatch();
  const errRef = useRef<HTMLParagraphElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const [email, reset, setEmail] = useInput("email", " ");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const email = { values }.values.email;
      const response = await axios.post(
        LOGIN_URL,
        { ...values },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      const accessToken = response.data.accessToken;
      dispatch(
        setAuth({
          email,
          accessToken,
        }),
      );
      navigate(from, { replace: true });
      reset();
      setSuccess(true);
    } catch (error: any) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error?.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current?.focus();
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [persist, togglePersist] = useToggle("persist", false);

  return (
    <section className="w-full flex-col h-screen justify-center bg-primary items-center flex">
      <h1 className="text-white text-2xl mb-5">Welcome Back !!</h1>
      <div
        className={cn(
          "bg-slate-300 max-w-[350px] w-[70%] mx-auto p-10 rounded-lg",
        )}
      >
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
                        required
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setEmail(e.target.value);
                        }}
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
                          required
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
              <div className="flex gap-5">
                <FormLabel className="mt-3">Persist Login ?</FormLabel>
                <Input
                  type="checkbox"
                  className="w-3"
                  onChange={(e) => togglePersist(e.target.checked)}
                  checked={
                    typeof persist === "string" ? JSON.parse(persist) : persist
                  }
                />
              </div>
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
