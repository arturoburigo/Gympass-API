import { Router } from "express"; // Importa Router
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";

export async function userRoutes(router: Router) {
  router.post("/register", register);
  router.post("/sessions", authenticate);
  router.get("/me", isAuthenticated, profile);
}
