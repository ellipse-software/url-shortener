import { getKey } from "@/lib/key";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ link: string }> }
) {
  const availableParams = await params;
  const cloudflareContext: any = await getCloudflareContext();

  const linkKeyValueStore: KVNamespace = cloudflareContext.env.LINKS;

  if (!linkKeyValueStore)
    throw new Error("Missing KV Namespace: LINKS do not exist.");

  const link = await getKey(availableParams.link, linkKeyValueStore);

  if (!link) {
    return Response.redirect("/");
  }

  return Response.redirect(link, 301);
}
