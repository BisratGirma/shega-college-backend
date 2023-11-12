import { Request, Response } from "express";

import { CourseService } from "../services/course.service";
import { plainToInstance } from "class-transformer";
import { CourseData, CourseUpdateData } from "../types/course";
import { validate } from "class-validator";
import minimizeClassValidatorError from "../lib/minimize_class_validator";
import { PaginationOptions } from "../types/general";

const courseService = new CourseService();

export async function healthCheck(req: Request, res: Response): Promise<void> {
  res.status(200).json({ message: "course route active" });
  return;
}

/**
 * createCourse - creates a new course
 *
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns void
 */
export async function createCourse(req: Request, res: Response): Promise<void> {
  const courseData = plainToInstance(CourseData, req.body);

  try {
    const validationErrors = await validate(courseData);

    if (validationErrors.length > 0) {
      const mimizedValidationErrors =
        minimizeClassValidatorError(validationErrors);

      res.status(400).json(mimizedValidationErrors);
      return;
    }

    const sanitizedCourseData: CourseData = {
      course_code: courseData.course_code,
      credit_hours: courseData.credit_hours,
      description: courseData.description,
      title: courseData.title,
    };

    const result = courseService.createCourse(sanitizedCourseData);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}

/**
 * getOneCourse - gets one course document from db using course id
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns
 */
export async function getOneCourse(req: Request, res: Response): Promise<void> {
  const courseID = Number(req.params.courseID);

  if (courseID == null) {
    res.status(400).json({ message: "Please, provide a course ID" });
    return;
  }

  try {
    const result = await courseService.getCourseById(courseID);

    if (result == null) {
      res.status(400).json({ message: "Course not found!" });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message:
        "We couldn't accept your request right now, Please try again later!",
    });
  }
}

/**
 * getCoursePaginated - gets paginated course documents from db using,
 *
 *
 * @param req Express Request object (req.query.search_key: search courses with title,
 *                                     req.query.page: page number to return,
 *                                      req.query.per_page: dictates how many documents to return per page )
 * @param res Express Response object
 * @returns
 */
export async function getCoursePaginated(
  req: Request,
  res: Response
): Promise<void> {
  const searchKey = req.query.search_key;
  const page = req.query.page;
  const perPage = req.query.per_page;

  const courseQuery: PaginationOptions = {};
  if (searchKey != null)
    courseQuery.keyword = searchKey?.toLocaleString() ?? "";
  if (page != null) courseQuery.skip = Number(page) ?? 1;
  if (perPage != null) courseQuery.take = Number(perPage) ?? 10;

  try {
    const result = await courseService.getCoursePagination(courseQuery);

    if (result.count === 0) {
      res.status(400).json({ message: "we couldn't find any course" });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message:
        "We couldn't accept your request right now, please try again later!",
    });
  }
}

/**
 * updateCourse - gets paginated course documents from db using,
 *
 *
 * @param req Express Request object (req.query.search_key: search courses with title,
 *                                     req.query.page: page number to return,
 *                                      req.query.per_page: dictates how many documents to return per page )
 * @param res Express Response object
 * @returns
 */
export async function updateCourse(req: Request, res: Response): Promise<void> {
  const couresID = Number(req.query.coures_id);

  if (couresID == null) {
    res.status(400).json({
      message: "Please, provide course id of the course to be updated",
    });
    return;
  }

  const courseUpdateData = plainToInstance(CourseUpdateData, req.body);

  if (Object.keys(courseUpdateData).length === 0) {
    res
      .status(400)
      .json({ message: "Please, provide update data to a course!" });
    return;
  }

  try {
    const validationErrors = await validate(courseUpdateData);

    if (validationErrors.length > 0) {
      const minimizedValidationError =
        minimizeClassValidatorError(validationErrors);

      res.status(400).json(minimizedValidationError);
      return;
    }

    const sanitizedCourseUpdateData: CourseUpdateData = {};

    if (courseUpdateData.course_code != null)
      sanitizedCourseUpdateData.course_code = courseUpdateData.course_code;
    if (courseUpdateData.credit_hours != null)
      sanitizedCourseUpdateData.credit_hours = courseUpdateData.credit_hours;
    if (courseUpdateData.description != null)
      sanitizedCourseUpdateData.description = courseUpdateData.description;
    if (courseUpdateData.title != null)
      sanitizedCourseUpdateData.title = courseUpdateData.title;

    const result = await courseService.updateCourse(
      Number(couresID),
      sanitizedCourseUpdateData
    );

    if (result == null) {
      res.status(400).json({ message: "we couldn't update the course" });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message:
        "We couldn't accept your request right now, Please try again later!",
    });
  }
}

/**
 * getOneCourse - gets one course document from db using course id
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns
 */
export async function deleteOneCourse(
  req: Request,
  res: Response
): Promise<void> {
  const courseID = Number(req.params.courseID);

  if (courseID == null) {
    res.status(400).json({ message: "Please, provide a course ID" });
    return;
  }

  try {
    const result = await courseService.deleteCourse(courseID);

    if (result == null) {
      res.status(400).json({ message: "Course not found!" });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "we have exprienced an error, please try again later!",
    });
  }
}

export default {
  healthCheck,
  createCourse,
  getOneCourse,
  getCoursePaginated,
  updateCourse,
  deleteOneCourse,
};
