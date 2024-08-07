import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", "..", "..", "..", ".env") });

const secret = process.env.JWT_SECRET;
const maxAge = 3 * 24 * 60 * 60;

if (!secret) {
  console.error("JWT_SECRET is not defined in environment variables");
  process.exit(1);
}

interface DecodedToken {
  id: string;
  iat: string;
  exp: string;
}

const signToken = (id: string): string => {
  return jwt.sign({ id }, secret, {
    expiresIn: maxAge,
  });
};

const verifyToken = (token: string): DecodedToken => {
  try {
    const verifiedToken = jwt.verify(token, secret);

    if (typeof verifiedToken === "string") {
      throw new Error("Token payload is unexpectedly a string");
    }

    if (!verifiedToken.id) {
      throw new Error("Token payload is missing the id field");
    }

    const decoded: DecodedToken = {
      id: verifiedToken.id,
      iat: verifiedToken.iat!.toString(),
      exp: verifiedToken.exp!.toString(),
    };

    return decoded;
  } catch (error) {
    throw new Error(`Token verification failed: ${error}`);
  }
};

export { signToken, verifyToken };
