import { didResolver } from "./did-resolver";
import didJWT from "did-jwt";
import { Request, Response, NextFunction } from "express";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      didauth?: any;
    }
  }
}
export default () => {
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
      const verifiedToken = await didJWT.verifyJWT(token, {
        resolver: didResolver,
      });
      request.didauth = verifiedToken;
      next();
    } catch (err) {
      return next(err);
    }
  };
};
