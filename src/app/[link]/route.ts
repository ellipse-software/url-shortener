import { getKey } from "@/lib/key";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ link: string }> }
) {
  const availableParams = await params;
  const cloudflareContext: any = await getCloudflareContext();

  const linkKeyValueStore: KVNamespace = cloudflareContext.env.LINKS;

  const link = await getKey(availableParams.link, linkKeyValueStore);

  if (!link) {
    return Response.redirect("https://ellipse.software");
  }

  return Response.redirect(link, 301);
}
