import { create } from "@/lib/create";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { type NextRequest } from "next/server";
import { formSchema } from "@/schema/createSchema";
import { z } from "zod";

export async function GET() {
  return Response.redirect("https://ellipse.software");
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("link");

  if (!query) {
    return Response.json({ error: "missing link" }, { status: 400 });
  }
  if (!z.string().url().safeParse(query).success) {
    return Response.json({ error: "invalid link" }, { status: 400 });
  }

  const link = await create(query);

  if (link.error) {
    return Response.json({ error: link.error }, { status: 500 });
  }

  return Response.json({ link: link.key });
}
