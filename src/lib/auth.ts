import jwt from "jsonwebtoken";

// eslint-disable-next-line
import { config } from "./../config";

export type JwtTokenPayload = {
  userId: string;
  name: string;
};
export function getUserDataFromJwtWithSignatureVerification(
  token: string,
): JwtTokenPayload | null {
  try {
    // eslint-disable-next-line
    const decoded = jwt.decode(
      token /** Buffer.from(config.JWT_SECRET, "base64") */,
    );
    return decoded as JwtTokenPayload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
