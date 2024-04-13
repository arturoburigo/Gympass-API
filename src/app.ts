import express, { Request, Response } from "express";
import { Router } from "express";
import { ZodError } from "zod";
import { env } from "./env";
import "express-async-errors";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { userRoutes } from "./http/controllers/users/routes";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";

export const app = express();
const router = Router();
app.use(express.json());
userRoutes(router);
gymsRoutes(router); 
checkInsRoutes(router);
app.use(router);
app.use((error: Error, request: Request, response: Response) => {
  if (error instanceof ZodError) {
    return response.status(400).json({ message: "Validation error", issues: error.format() });
  }
  if (env.NODE_ENV !== "production") {
    console.log(error);
  } else {
    console.log("Fazer depois");
  }
  return response.status(500).json({ message: "Internal server error" });
});
