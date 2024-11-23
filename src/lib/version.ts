import pConfig from "@/../package.json";

export async function outdated() {
  const response = await fetch(
    "https://api.github.com/repos/ellipse-software/url-shortener/releases/latest"
  );

  if (!response.ok) {
    return false;
  }

  const data: any = await response.json();

  const tag = data.tag_name.replace("v", "");
  const current = pConfig.version;

  if (tag !== current) {
    return tag;
  }

  return false;
}
