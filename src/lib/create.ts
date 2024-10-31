import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers } from "next/headers";

function generateKey(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export async function create(link: string, length: number = 5) {
  const cloudflareContext: any = await getCloudflareContext();
  const ip = (await headers()).get("cf-connecting-ip") || "no ip";

  const linkKeyValueStore: KVNamespace = cloudflareContext.env.LINKS;
  const limitKeyValueStore: KVNamespace = cloudflareContext.env.LIMITS;

  const limit = await limitKeyValueStore.get(ip);

  if (limit != null) {
    if (parseInt(limit) > Date.now() - 5000) {
      return {
        error: "Rate limit exceeded",
      };
    }
  }

  const key = generateKey(length);

  const check = await linkKeyValueStore.get(key);

  if (check != null) {
    return create(link, length + 1);
  }

  try {
    const res = await linkKeyValueStore.put(key, link);

    await limitKeyValueStore.put(ip, Date.now().toString(), {
      expirationTtl: 5000,
    });
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
