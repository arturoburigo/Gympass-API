import { Router } from "express"; // Importa Router
import { register } from "./http/controllers/register";

export async function appRoutes(router: Router) {
  router.post("/register", register);
}
