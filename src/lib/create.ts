import { getCloudflareContext } from "@opennextjs/cloudflare";

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

  const linkKeyValueStore: KVNamespace = cloudflareContext.env.LINKS;

  const key = generateKey(length);

  const check = await linkKeyValueStore.get(key);

  if (check != null) {
    return create(link, length + 1);
  }

  await linkKeyValueStore.put(key, link);

  return key;
}
