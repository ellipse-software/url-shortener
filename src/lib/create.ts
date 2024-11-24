import { getCloudflareContext } from "@opennextjs/cloudflare";
import { checkRateLimit, setRateLimit } from "./rateLimit";
import { existingLinkCheck, generateKey } from "./key";
import { sendNotification } from "./notification";

export async function create(
  link: string,
  ip: string,
  rayId: string,
  length = 5
) {
  const timeA = Date.now();

  const cloudflareContext: any = await getCloudflareContext();

  const linkKeyValueStore: KVNamespace = cloudflareContext.env.LINKS;
  const reverseLinkKeyValueStore: KVNamespace =
    cloudflareContext.env.REVERSE_LINKS;
  const limitKeyValueStore: KVNamespace = cloudflareContext.env.LIMITS;

  if (!linkKeyValueStore)
    throw new Error("Missing KV Namespace: LINKS do not exist.");
  if (!reverseLinkKeyValueStore)
    throw new Error("Missing KV Namespace: REVERSE_LINKS do not exist.");
  if (!limitKeyValueStore)
    throw new Error("Missing KV Namespace: LIMITS do not exist.");

  if (!(await checkRateLimit(ip, limitKeyValueStore))) {
    return {
      error: "Rate limited",
    };
  }

  const existingLink = await existingLinkCheck(link, reverseLinkKeyValueStore);
  if (existingLink) {
    await sendNotification(
      cloudflareContext.env.DISCORD_WEBHOOK,
      "Link Created",
      "An existing link has been requested",
      [
        {
          name: "🔗 Link",
          value: `📥 \`${link}\`\n📤 \`${existingLink}\``,
          inline: true,
        },
        {
          name: "🔎 Context",
          value: `🌍 \`${cloudflareContext.cf.country}\` / \`${cloudflareContext.cf.city}\`\n🔦 \`${rayId}\``,
          inline: true,
        },
      ],
      `⏱️ ${Date.now() - timeA}ms`,
      16769859
    );

    return { key: existingLink };
  }

  const key = await generateKey(length, linkKeyValueStore);

  try {
    await linkKeyValueStore.put(key, link);
    await reverseLinkKeyValueStore.put(link, key);
    await setRateLimit(ip, limitKeyValueStore);
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to create link",
    };
  }

  await sendNotification(
    cloudflareContext.env.DISCORD_WEBHOOK,
    "Link Created",
    "A new link has been created",
    [
      {
        name: "🔗 Link",
        value: `📥 \`${link}\`\n📤 \`${key}\``,
        inline: true,
      },
      {
        name: "🔎 Context",
        value: `🌍 \`${cloudflareContext.cf.country}\` / \`${cloudflareContext.cf.city}\`\n🔦 \`${rayId}\``,
        inline: true,
      },
    ],
    `⏱️ ${Date.now() - timeA}ms`
  );

  return {
    key: key,
  };
}
