"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function RetryCopyDialog({
  retry,
  setRetry,
  link,
}: Readonly<{
  retry: boolean;
  setRetry: (value: boolean) => void;
  link: string;
}>) {
  const [copied, setCopied] = useState(false);

  return (
    <Dialog open={retry} onOpenChange={setRetry}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Copy link</DialogTitle>
          <DialogDescription>
            Copy the link below to share it with others.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={link} readOnly />
          </div>
          <Button
            type="submit"
            onClick={async () => {
              setCopied(true);
              await navigator.clipboard.writeText(link);
              setTimeout(() => setCopied(false), 3000);
            }}
            size="sm"
            className={cn(
              "px-3",
              copied && "bg-green-500 hover:bg-green-600 text-white"
            )}
          >
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
