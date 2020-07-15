import * as Daf from "daf-core";
import { JwtMessageHandler } from "daf-did-jwt";
import { W3cMessageHandler } from "daf-w3c";
import { DafResolver } from "./resolver";
import { DIDCache } from "did-resolver";

interface NetworkConfig {
  name: string;
  rpcUrl: string;
  registry?: string;
}

interface ResolverOptions {
  infuraProjectId?: string;
  networks?: NetworkConfig[];
  cache?: boolean | DIDCache;
}

export interface DAFOptions {
  resolverOptions: ResolverOptions;
}

export function createDAFagent(options: DAFOptions): Daf.Agent {
  const resolverOptions = options.resolverOptions;
  if (!resolverOptions.networks && !resolverOptions.infuraProjectId) {
    resolverOptions.infuraProjectId = process.env.INFURA_PROJECT_ID;
  }
  const didResolver = new DafResolver(resolverOptions);

  const messageHandler = new JwtMessageHandler();
  messageHandler.setNext(new W3cMessageHandler());

  return new Daf.Agent({
    identityProviders: [],
    didResolver,
    messageHandler,
  });
}
