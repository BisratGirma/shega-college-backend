/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import courseController from "../../controller/course.controller";

const router = Router();

/**
 * Client Signup Routes
 */
router.get("/healthcheck", courseController.healthCheck);

router.get("/get-one/:courseID", courseController.getOneCourse);

export default router;
