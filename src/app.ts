import express, { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { appRoutes } from "./routes";
import { ZodError } from "zod";
import { env } from "./env";
import "express-async-errors";

export const app = express();

const router = Router();
app.use(express.json());
app.use(router);

appRoutes(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
      return response
        .status(400)
        .json({ message: "Validation error", issues: error.format() });
    }

    if (env.NODE_ENV !== "production") {
      console.log(error);
    } else {
    }

    return response.status(500).json({ message: "Internal server error" });
  },
);
