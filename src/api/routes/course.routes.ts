/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import courseController from "../../controller/course.controller";

const router = Router();

router.get("/healthcheck", courseController.healthCheck);

/**
 * Client Signup Routes
 */
router.post("/create", courseController.createCourse);

router.get("/get-one/:courseID", courseController.getOneCourse);

export default router;
