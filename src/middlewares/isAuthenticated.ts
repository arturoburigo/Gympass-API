import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}
export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.sendStatus(401).end();
  }
  const [, token] = authToken.split(" ");
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT secret is not defined.");
    return response.sendStatus(500).end();
  }
  try {
    const { sub } = verify(token, jwtSecret) as Payload;
    request.user_id = sub;
    console.log(sub);
    return next();
  } catch (error) {
    return response.sendStatus(401).end();
  }
}
