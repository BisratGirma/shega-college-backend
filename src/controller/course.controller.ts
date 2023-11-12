import { Request, Response } from "express";

import { CourseService } from "../services/course.service";
import { plainToInstance } from "class-transformer";
import { CourseData } from "../types/course";
import { validate } from "class-validator";
import minimizeClassValidatorError from "../lib/minimize_class_validator";

const courseService = new CourseService();

export async function healthCheck(req: Request, res: Response): Promise<void> {
  res.status(200).json({ message: "course route active" });
  return;
}

export async function createCourse(req: Request, res: Response): Promise<void> {
  const courseData = plainToInstance(CourseData, req.body);

  const validationErrors = await validate(courseData);

  if (validationErrors.length > 0) {
    const mimizedValidationErrors =
      minimizeClassValidatorError(validationErrors);

    res.status(400).json(mimizedValidationErrors);
    return;
  }

  res.status(200).json({ data: courseData });
}

export async function getOneCourse(req: Request, res: Response): Promise<void> {
  const courseID = req.params.courseID;

  if (courseID != null) {
    res.status(400).json({ message: "Please, provide a course ID" });
    return;
  }

  const result = await courseService.getCourseById(courseID);

  if (result == null) {
    res.status(400).json({ message: "Course not found!" });
    return;
  }

  res.status(200).json(result);
}

export default {
  healthCheck,
  createCourse,
  getOneCourse,
};
