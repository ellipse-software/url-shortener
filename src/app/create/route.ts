import { create } from "@/lib/create";
import { type NextRequest } from "next/server";
import { z } from "zod";
import { headers } from "next/headers";

export async function GET() {
  return Response.redirect("https://ellipse.software");
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("link");
  const ip =
    (await headers()).get("cf-connecting-ip") || "Couldn't find identity";

  if (!query) {
    return Response.json({ error: "missing link" }, { status: 400 });
  }
  if (!z.string().url().safeParse(query).success) {
    return Response.json({ error: "invalid link" }, { status: 400 });
  }

  const link = await create(query, ip);

  if (link.error) {
    return Response.json({ error: link.error }, { status: 500 });
  }

  return Response.json({ link: link.key });
}
