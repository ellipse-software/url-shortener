import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers } from "next/headers";
import { checkRateLimit, setRateLimit } from "./rateLimit";
import { generateKey } from "./key";

export async function create(link: string, length = 5) {
  const cloudflareContext: any = await getCloudflareContext();
  const ip = (await headers()).get("cf-connecting-ip") || "no ip";

  const linkKeyValueStore: KVNamespace = cloudflareContext.env.LINKS;
  const limitKeyValueStore: KVNamespace = cloudflareContext.env.LIMITS;

  if (!(await checkRateLimit(ip, limitKeyValueStore))) {
    return {
      error: "Rate limited",
    };
  }

  const key = await generateKey(length, linkKeyValueStore);

  try {
    await linkKeyValueStore.put(key, link);
    await setRateLimit(ip, limitKeyValueStore);
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to create link",
    };
  }

  return {
    key: key,
  };
}
