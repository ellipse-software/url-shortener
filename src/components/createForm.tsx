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
import { useEffect, useState } from "react";
import { RetryCopyDialog } from "./retryCopy";

export function CreateForm() {
  const [retry, setRetry] = useState(false);
  const [link, setLink] = useState("");
  const [clipboard, setClipboard] = useState<Clipboard | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigator.clipboard) {
      setClipboard(navigator.clipboard);
    } else {
      console.error("Clipboard API not available");
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const timeA = new Date();

    if (values.link.startsWith(window.location.href)) {
      toast.info(`Looks like you tried to shorten a shortened link!`, {});
      setLoading(false);
      return;
    }

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

      setLink(fullLink);
      form.setValue("link", fullLink);
      form.setFocus("link");

      try {
        if (clipboard) {
          await clipboard.writeText(fullLink);
          toast.success(`Link copied to clipboard in ${timeTaken}ms`, {});
        } else throw new Error("Clipboard API not available");
      } catch (error) {
        toast.success(`Link created in ${timeTaken}ms`, {});
        setRetry(true);
        console.error(error);
      }
    } catch (error) {
      toast.error("Failed to create link. Are you rate limited?");
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <>
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
                    id="link-akO3fj"
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
      {retry && (
        <RetryCopyDialog retry={retry} setRetry={setRetry} link={link} />
      )}
    </>
  );
}
