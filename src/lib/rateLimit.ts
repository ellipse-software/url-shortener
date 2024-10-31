export async function setRateLimit(
  ip: string,
  limitKeyValueStore: KVNamespace
) {
  await limitKeyValueStore.put(ip, Date.now().toString(), {
    expirationTtl: 5000,
  });
}

export async function checkRateLimit(
  ip: string,
  limitKeyValueStore: KVNamespace
) {
  const limit = await limitKeyValueStore.get(ip);

  if (limit != null) {
    if (parseInt(limit) > Date.now() - 5000) {
      return false;
    }
  }

  return true;
}
