import { Router } from "express";
import controller from "../controllers/authController.js";

const router = Router();

router.get("/", controller.init);
router.post("/signin", controller.signin);
router.post("/login", controller.login);

export default router;
