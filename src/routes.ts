import { Router } from "express"; // Importa Router
import { register } from "./http/controllers/register";
import { authenticate } from "./http/controllers/authenticate";

export async function appRoutes(router: Router) {
  router.post("/register", register);
  router.post("/sessions", authenticate);
}
