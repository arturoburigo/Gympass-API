import { Router } from "express"; // Importa Router
import { isAuthenticated } from "../../../middlewares/isAuthenticated";
import { create } from "./create";
import { nearby } from "./nearby";
import { search } from "./search";

export async function gymsRoutes(router: Router) {
  router.post("/gyms/create", isAuthenticated, create);
  router.get("/gyms/nearby", isAuthenticated, nearby);
  router.get("/gyms/search", isAuthenticated, search);
}
