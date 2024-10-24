import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ link: string }> }
) {
  const availableParams = await params;
  const cloudflareContext: any = await getCloudflareContext();

  const linkKeyValueStore: KVNamespace = cloudflareContext.env.LINKS;

  const link = await linkKeyValueStore.get(availableParams.link);

  if (link === null) {
    return new Response("not found", { status: 404 });
  }

  console.log(link);

  return Response.redirect(link, 301);
}
