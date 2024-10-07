import jwt from "jsonwebtoken";

import { config } from './../config';

export type JwtToknePayload = {
  userId: string;
  name: string;
};

export function getUserDataFromJwtWithSignatureVerefication(token: string): JwtToknePayload {
  const decoded = jwt.verify(token, config.JWT_SECRET);
  return decoded as JwtToknePayload;
}
