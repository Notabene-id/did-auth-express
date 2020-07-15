import { createDAFagent, DAFOptions } from "./agent";
import { Request, Response, NextFunction } from "express";
import { Message } from "daf-core";
import { redisCache } from "./cache";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      didauth?: any;
    }
  }
}

export default (dafOptions: DAFOptions): Function => {
  const agent = createDAFagent(dafOptions);

  return async (
    request: Request,
    _response: Response,
    next: NextFunction
  ): Promise<void> => {
    const authHead = request.headers["authorization"];
    if (!authHead) return next();
    const parts = authHead.split(" ");
    if (parts.length !== 2)
      return next(new Error("Format is Authorization: Bearer [token]"));
    const scheme = parts[0];
    if (scheme !== "Bearer")
      return next(new Error("Format is Authorization: Bearer [token]"));

    const token = parts[1];

    try {
      const message: Message = await agent.handleMessage({
        raw: token,
        save: false, // default = true
      });

      const issuer = message.data.iss;
      const payload = message.data.vc.credentialSubject;
      request.didauth = {
        issuer,
        payload,
      };
      next();
    } catch (err) {
      return next(err);
    }
  };
};

export { redisCache, DAFOptions };
