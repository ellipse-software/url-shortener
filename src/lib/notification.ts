import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function sendNotification(
  title: string,
  description: string,
  fields: any[],
  footer: string,
  color = 5424336
): Promise<void> {
  const { env }: any = await getCloudflareContext();

  const webhook = env.DISCORD_WEBHOOK;

  if (!webhook) return;

  await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      embeds: [
        {
          title,
          description,
          color,
          fields,
          footer: {
            timestamp: new Date().toISOString(),
            text: footer,
          },
        },
      ],
    }),
  });
}
