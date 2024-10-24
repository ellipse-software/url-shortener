import { create } from "@/lib/create";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("link");

  if (!query) {
    return Response.json({ error: "missing link" }, { status: 400 });
  }
  if (
    !query.match(
      /^[a-zA-Z]+:\/\/[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?\/?$/
    )
  ) {
    return Response.json({ error: "invalid link" }, { status: 400 });
  }

  const link = await create(query);

  return Response.json({ link: link });
}
