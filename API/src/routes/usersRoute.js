import { Router } from "express";
import jwtAuth from "../middlewares/jwt.js";
import controller from "../controllers/usersController.js";

const router = Router();

router.get("/users", jwtAuth.verifyToken, controller.init);
router.get("/users/data", jwtAuth.verifyToken, controller.getAllData);
router.post("/users/refresh-token", jwtAuth.refreshToken);

export default router;
