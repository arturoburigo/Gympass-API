import { Router } from "express"; // Importa Router
import { register } from "./http/controllers/register";
import { authenticate } from "./http/controllers/authenticate";
import { profile } from "./http/controllers/profile";
import { isAuthenticated } from "./middlewares/isAuthenticated";

export async function appRoutes(router: Router) {
  router.post("/register", register);
  router.post("/sessions", authenticate);

  router.get("/me", isAuthenticated, profile);
}
