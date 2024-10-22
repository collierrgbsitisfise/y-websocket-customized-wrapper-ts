import jwt from "jsonwebtoken";

import { config } from "./../config";

export type JwtTokenPayload = {
  userId: string;
  name: string;
};
export function getUserDataFromJwtWithSignatureVerefication(
  token: string
): JwtTokenPayload | null {
  try {
    const decoded = jwt.verify(token, Buffer.from(config.JWT_SECRET, "base64"));
    return decoded as JwtTokenPayload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
