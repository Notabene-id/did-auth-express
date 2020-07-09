import * as Daf from "daf-core";
import { JwtMessageHandler } from "daf-did-jwt";
import { W3cMessageHandler } from "daf-w3c";
import { DafResolver } from "daf-resolver";

const infuraProjectId = "5ffc47f65c4042ce847ef66a3fa70d4c";
const didResolver = new DafResolver({ infuraProjectId });

const messageHandler = new JwtMessageHandler();
messageHandler.setNext(new W3cMessageHandler());

export const agent = new Daf.Agent({
  identityProviders: [],
  didResolver,
  messageHandler,
});
