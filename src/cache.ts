import { DIDCache, DIDDocument } from "did-resolver";
import Redis from "ioredis";
import Debug from "debug";

const debug = Debug("daf:cache");

export function redisCache(redisUrl: string): DIDCache {
  const redis = new Redis(redisUrl);

  return async (parsed, resolve): Promise<DIDDocument | null> => {
    if (parsed.params && parsed.params["no-cache"] === "true")
      return await resolve();

    const cached = await redis.get(parsed.did);
    debug("cached: %o", cached);
    if (cached !== null) return JSON.parse(cached);
    const doc = await resolve();
    if (doc !== null) {
      debug("doc: %o", doc);
      await redis.set(parsed.did, JSON.stringify(doc));
    }
    return doc;
  };
}
