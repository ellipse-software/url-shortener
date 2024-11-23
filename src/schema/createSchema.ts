"use client";

import { z } from "zod";

export const formSchema = z.object({
  link: z.string().url().max(32768),
});
