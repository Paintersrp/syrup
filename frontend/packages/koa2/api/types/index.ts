import { JwtPayload } from 'jsonwebtoken';

// const { user, role, token }: ContextState = ctx.state;
export type ContextState = {
  user: string;
  role: string;
  token2: JwtPayload;
};

export type CacheDTO = {
  cacheKey: string;
  response: string;
};

export type RequestDTO = {
  method: string;
  endpoint: string;
  headers: string;
  payload: string;
};
