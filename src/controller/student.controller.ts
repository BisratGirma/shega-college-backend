import { Request, Response } from "express";

import { StudentService } from "../services/student.service";
import { plainToInstance } from "class-transformer";
import { StudentData, StudentUpdateData } from "../types/student";
import { validate } from "class-validator";
import minimizeClassValidatorError from "../lib/minimize_class_validator";
import { PaginationOptions } from "../types/general";
import { Student } from "../models/student.model";

const studentService = new StudentService();

export async function healthCheck(req: Request, res: Response): Promise<void> {
  res.status(200).json({ message: "student route active" });
  return;
}

/**
 * createStudent - creates a new student
 *
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns void
 */
export async function createStudent(
  req: Request,
  res: Response
): Promise<void> {
  const studentData = plainToInstance(StudentData, req.body);

  try {
    const validationErrors = await validate(studentData);

    if (validationErrors.length > 0) {
      const mimizedValidationErrors =
        minimizeClassValidatorError(validationErrors);

      res.status(400).json(mimizedValidationErrors);
      return;
    }

    const sanitizedStudentData: StudentData = {
      contact_details: studentData.contact_details,
      name: studentData.name,
    };

    const result = studentService.createStudent(sanitizedStudentData);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}

/**
 * getOneStudent - gets one student document from db using student id
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns
 */
export async function getOneStudent(
  req: Request,
  res: Response
): Promise<void> {
  const studentID = Number(req.params.studentID);

  if (studentID == null) {
    res.status(400).json({ message: "Please, provide a student ID" });
    return;
  }

  try {
    const result = await studentService.getStudentById(studentID);

    if (result == null) {
      res.status(400).json({ message: "Student not found!" });
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
 * getStudentPaginated - gets paginated student documents from db using,
 *
 *
 * @param req Express Request object (req.query.search_key: search students with title,
 *                                     req.query.page: page number to return,
 *                                      req.query.per_page: dictates how many documents to return per page )
 * @param res Express Response object
 * @returns
 */
export async function getStudentPaginated(
  req: Request,
  res: Response
): Promise<void> {
  const searchKey = req.query.search_key;
  const page = req.query.page;
  const perPage = req.query.per_page;

  const studentQuery: PaginationOptions = {};
  if (searchKey != null)
    studentQuery.keyword = searchKey?.toLocaleString() ?? "";
  if (page != null) studentQuery.skip = Number(page) ?? 1;
  if (perPage != null) studentQuery.take = Number(perPage) ?? 10;

  try {
    const result = await studentService.getStudentPagination(studentQuery);

    if (result.count === 0) {
      res.status(400).json({ message: "we couldn't find any student" });
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

// /**
//  * updateStudent - gets paginated student documents from db using,
//  *
//  *
//  * @param req Express Request object (req.query.search_key: search students with title,
//  *                                     req.query.page: page number to return,
//  *                                      req.query.per_page: dictates how many documents to return per page )
//  * @param res Express Response object
//  * @returns
//  */
// export async function updateStudent(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const couresID = Number(req.query.coures_id);

//   if (couresID == null) {
//     res.status(400).json({
//       message: "Please, provide student id of the student to be updated",
//     });
//     return;
//   }

//   const studentUpdateData = plainToInstance(StudentUpdateData, req.body);

//   if (Object.keys(studentUpdateData).length === 0) {
//     res
//       .status(400)
//       .json({ message: "Please, provide update data to a student!" });
//     return;
//   }

//   try {
//     const validationErrors = await validate(studentUpdateData);

//     if (validationErrors.length > 0) {
//       const minimizedValidationError =
//         minimizeClassValidatorError(validationErrors);

//       res.status(400).json(minimizedValidationError);
//       return;
//     }

//     const sanitizedStudentUpdateData: StudentUpdateData = {};

//     if (studentUpdateData.contact_details != null)
//       sanitizedStudentUpdateData.contact_details =
//         studentUpdateData.contact_details;
//     if (studentUpdateData.courses != null){
//         sanitizedStudentUpdateData.courses = studentUpdateData.courses;

//         studentService
//     }

//     if (studentUpdateData.name != null)
//       sanitizedStudentUpdateData.name =
//         studentUpdateData.name;

//     const result = await studentService.updateStudent(
//       Number(couresID),
//       sanitizedStudentUpdateData
//     );

//     if (result == null) {
//       res.status(400).json({ message: "we couldn't update the student" });
//       return;
//     }

//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({
//       message:
//         "We couldn't accept your request right now, Please try again later!",
//     });
//   }
// }

/**
 * getOneStudent - gets one student document from db using student id
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns
 */
export async function deleteOneStudent(
  req: Request,
  res: Response
): Promise<void> {
  const studentID = Number(req.params.studentID);

  if (studentID == null) {
    res.status(400).json({ message: "Please, provide a student ID" });
    return;
  }

  try {
    const result = await studentService.deleteStudent(studentID);

    if (result == null) {
      res.status(400).json({ message: "Student not found!" });
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
  createStudent,
  getOneStudent,
  getStudentPaginated,
  updateStudent,
  deleteOneStudent,
};
