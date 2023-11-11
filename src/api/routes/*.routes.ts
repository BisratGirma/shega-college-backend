/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import renameThisController from "../../controller/*.controller";

const router = Router();

/**
 * Client Signup Routes
 */
router.post("/signup-validation", renameThisController.healthCheck);

export default router;
