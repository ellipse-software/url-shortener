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

async function setRateLimit(ip: string, limitKeyValueStore: KVNamespace) {
  await limitKeyValueStore.put(ip, Date.now().toString(), {
    expirationTtl: 5000,
  });
}

async function checkRateLimit(ip: string, limitKeyValueStore: KVNamespace) {
  const limit = await limitKeyValueStore.get(ip);

  if (limit != null) {
    if (parseInt(limit) > Date.now() - 5000) {
      return false;
    }
  }

  return true;
}

export async function create(link: string, length: number = 5) {
  const cloudflareContext: any = await getCloudflareContext();
  const ip = (await headers()).get("cf-connecting-ip") || "no ip";

  const linkKeyValueStore: KVNamespace = cloudflareContext.env.LINKS;
  const limitKeyValueStore: KVNamespace = cloudflareContext.env.LIMITS;

  if (!checkRateLimit(ip, limitKeyValueStore)) {
    return {
      error: "Rate limited",
    };
  }

  const key = generateKey(length);

  const check = await linkKeyValueStore.get(key);

  if (check != null) {
    return create(link, length + 1);
  }

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
