"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/schema/createSchema";
import { toast } from "sonner";
import { useState } from "react";

export function CreateForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const timeA = new Date();

    try {
      const res = await fetch(`/create?link=${values.link}`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to create link");
      }

      const data: { link: string } = await res.json();
      const baseUrl = window.location.href;
      const fullLink = `${baseUrl}${data.link}`;

      const timeTaken = new Date().getTime() - timeA.getTime();

      navigator.clipboard.writeText(fullLink);
      form.reset();

      toast.success(`Link copied to clipboard in ${timeTaken}ms`, {});
    } catch (error) {
      toast.error("Failed to create link");
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col items-center justify-center"
      >
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="w-full">
                <Input
                  className="w-full"
                  placeholder="https://ellipse.software"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          className="max-w-48 w-full"
          variant="secondary"
          type="submit"
        >
          {loading ? "Shortening..." : "Shorten"}
        </Button>
      </form>
    </Form>
  );
}
