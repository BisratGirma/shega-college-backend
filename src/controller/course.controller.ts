import { Request, Response } from "express";

import { CourseService } from "../services/course.service";

const courseService = new CourseService();

export async function healthCheck(req: Request, res: Response): Promise<void> {
  res.status(200).json({ message: "course route active" });
  return;
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
  getOneCourse,
};
