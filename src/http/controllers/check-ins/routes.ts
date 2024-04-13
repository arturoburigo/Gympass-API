import { Router } from "express";
import { isAuthenticated } from "../../../middlewares/isAuthenticated";
import { history } from "./history";
import { metrics } from "./metrics";
import { create } from "./create";
import { validate } from "./validate";

export async function checkInsRoutes(router: Router) {
  router.get("/check-ins/history", isAuthenticated, history);
  router.get("/check-ins/metrics", isAuthenticated, metrics);
  router.post("/gyms/:gymId/check-ins", isAuthenticated, create);
  router.patch("/check-ins/:checkInId/validate", isAuthenticated, validate);
}
