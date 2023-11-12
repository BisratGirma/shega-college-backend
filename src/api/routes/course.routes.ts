/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import courseController from "../../controller/course.controller";

const router = Router();

router.get("/healthcheck", courseController.healthCheck);

router.post("/create", courseController.createCourse);

router.get("/get-one/:courseID", courseController.getOneCourse);

router.get("/paginate", courseController.getCoursePaginated);

router.put("/update", courseController.updateCourse);

router.delete("/delete/:courseID", courseController.deleteOneCourse);

export default router;
