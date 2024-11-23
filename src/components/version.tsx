"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { outdated } from "@/lib/version";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Version({ currentVersion }: { currentVersion: string }) {
  const [latestVersion, setLatestVersion] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await outdated();
        if (result) setLatestVersion(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return latestVersion ? (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="https://github.com/ellipse-software/url-shortener/releases/latest"
            target="_blank"
            className="text-xs text-yellow-600"
          >
            v{currentVersion}
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs text-foreground">
            v{latestVersion} is now available
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <p className="text-xs text-foreground/50">v{currentVersion}</p>
  );
}
