import { Resolver } from "did-resolver";
import * as ethr from "ethr-did-resolver";
import * as webResolver from "web-did-resolver";
import { resolver as naclDidResolver } from "nacl-did";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolvers: any = {
  ...webResolver.getResolver(),
  nacl: naclDidResolver,
};
if (process.env.INFURA_PROJECT_ID) {
  const ethrDidResolverConfig = {
    rpcUrl: "https://mainnet.infura.io/v3/" + process.env.INFURA_PROJECT_ID,
  };
  const ethrResolver = ethr.getResolver(ethrDidResolverConfig);
  resolvers.ethr = ethrResolver.ethr;
} else {
  console.error(
    "no INFURA_PROJECT_ID env var. ethr-did-resolver not available"
  );
}

export const didResolver = new Resolver(resolvers);
