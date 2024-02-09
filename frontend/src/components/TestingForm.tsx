// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { z } from "zod";

import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
// import { Input } from "@/components/ui/input";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function TestingForm() {
  const [value, setValue] = useLocalStorage({ key: "user" });
  // 1. Define your form.
  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const username = values.username;
    setValue(username);

    console.log(values, value);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <input
                  type="text"
                  className="p-5 m-2 rounded-md bg-slate-300 w-full"
                  //   {...field}
                  {...field}
                  //   onChange={setValue(field.value) || " "}
                  onChange={(e) => {
                    field.onChange(e);
                    setValue(e.target.value);
                  }}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
