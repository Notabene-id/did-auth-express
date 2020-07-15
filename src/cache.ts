import { DIDCache, DIDDocument } from "did-resolver";
import Redis from "ioredis";

export function redisCache(redisUrl: string): DIDCache {
  const redis = new Redis(redisUrl);

  return async (parsed, resolve): Promise<DIDDocument | null> => {
    if (parsed.params && parsed.params["no-cache"] === "true")
      return await resolve();

    const cached = await redis.get(parsed.did);
    console.log(cached);
    if (cached !== null) return JSON.parse(cached);
    const doc = await resolve();
    if (doc !== null) {
      console.log(doc);
      await redis.set(parsed.did, JSON.stringify(doc));
    }
    return doc;
  };
}
