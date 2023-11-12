import { Request, Response } from "express";

import { GradeService } from "../services/grade.service";
import { plainToInstance } from "class-transformer";
import { GradeData, GradeUpdateData } from "../types/grade";
import { validate } from "class-validator";
import minimizeClassValidatorError from "../lib/minimize_class_validator";
import { PaginationOptions } from "../types/general";

const gradeService = new GradeService();

export async function healthCheck(req: Request, res: Response): Promise<void> {
  res.status(200).json({ message: "grade route active" });
  return;
}

/**
 * createGrade - creates a new grade
 *
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns void
 */
export async function createGrade(req: Request, res: Response): Promise<void> {
  const gradeData = plainToInstance(GradeData, req.body);

  try {
    const validationErrors = await validate(gradeData);

    if (validationErrors.length > 0) {
      const mimizedValidationErrors =
        minimizeClassValidatorError(validationErrors);

      res.status(400).json(mimizedValidationErrors);
      return;
    }

    const sanitizedGradeData: GradeData = {
      academic_period: gradeData.academic_period,
      course_id: gradeData.course_id,
      grade_letter: gradeData.grade_letter,
    };

    const result = gradeService.createGrade(sanitizedGradeData);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}

/**
 * getOneGrade - gets one grade document from db using grade id
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns
 */
export async function getOneGrade(req: Request, res: Response): Promise<void> {
  const gradeID = Number(req.params.gradeID);

  if (gradeID == null) {
    res.status(400).json({ message: "Please, provide a grade ID" });
    return;
  }

  try {
    const result = await gradeService.getGradeById(gradeID);

    if (result == null) {
      res.status(400).json({ message: "Grade not found!" });
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
 * getGradePaginated - gets paginated grade documents from db using,
 *
 *
 * @param req Express Request object (req.query.search_key: search grades with title,
 *                                     req.query.page: page number to return,
 *                                      req.query.per_page: dictates how many documents to return per page )
 * @param res Express Response object
 * @returns
 */
export async function getGradePaginated(
  req: Request,
  res: Response
): Promise<void> {
  const searchKey = req.query.search_key;
  const page = req.query.page;
  const perPage = req.query.per_page;

  const gradeQuery: PaginationOptions = {};
  if (searchKey != null) gradeQuery.keyword = searchKey?.toLocaleString() ?? "";
  if (page != null) gradeQuery.skip = Number(page) ?? 1;
  if (perPage != null) gradeQuery.take = Number(perPage) ?? 10;

  try {
    const result = await gradeService.getGradePagination(gradeQuery);

    if (result.count === 0) {
      res.status(400).json({ message: "we couldn't find any grade" });
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
 * updateGrade - gets paginated grade documents from db using,
 *
 *
 * @param req Express Request object (req.query.search_key: search grades with title,
 *                                     req.query.page: page number to return,
 *                                      req.query.per_page: dictates how many documents to return per page )
 * @param res Express Response object
 * @returns
 */
export async function updateGrade(req: Request, res: Response): Promise<void> {
  const couresID = Number(req.query.coures_id);

  if (couresID == null) {
    res.status(400).json({
      message: "Please, provide grade id of the grade to be updated",
    });
    return;
  }

  const gradeUpdateData = plainToInstance(GradeUpdateData, req.body);

  if (Object.keys(gradeUpdateData).length === 0) {
    res
      .status(400)
      .json({ message: "Please, provide update data to a grade!" });
    return;
  }

  try {
    const validationErrors = await validate(gradeUpdateData);

    if (validationErrors.length > 0) {
      const minimizedValidationError =
        minimizeClassValidatorError(validationErrors);

      res.status(400).json(minimizedValidationError);
      return;
    }

    const sanitizedGradeUpdateData: GradeUpdateData = {};

    if (gradeUpdateData.academic_period != null)
      sanitizedGradeUpdateData.academic_period =
        gradeUpdateData.academic_period;
    if (gradeUpdateData.course_id != null)
      sanitizedGradeUpdateData.course_id = gradeUpdateData.course_id;
    if (gradeUpdateData.grade_letter != null)
      sanitizedGradeUpdateData.grade_letter = gradeUpdateData.grade_letter;

    const result = await gradeService.updateGrade(
      Number(couresID),
      sanitizedGradeUpdateData
    );

    if (result == null) {
      res.status(400).json({ message: "we couldn't update the grade" });
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
 * getOneGrade - gets one grade document from db using grade id
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns
 */
export async function deleteOneGrade(
  req: Request,
  res: Response
): Promise<void> {
  const gradeID = Number(req.params.gradeID);

  if (gradeID == null) {
    res.status(400).json({ message: "Please, provide a grade ID" });
    return;
  }

  try {
    const result = await gradeService.deleteGrade(gradeID);

    if (result == null) {
      res.status(400).json({ message: "Grade not found!" });
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
  createGrade,
  getOneGrade,
  getGradePaginated,
  updateGrade,
  deleteOneGrade,
};
