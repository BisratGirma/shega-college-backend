"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneStudent = exports.getStudentPaginated = exports.getOneStudent = exports.createStudent = exports.healthCheck = void 0;
const student_service_1 = require("../services/student.service");
const class_transformer_1 = require("class-transformer");
const student_1 = require("../types/student");
const class_validator_1 = require("class-validator");
const minimize_class_validator_1 = __importDefault(require("../lib/minimize_class_validator"));
const studentService = new student_service_1.StudentService();
function healthCheck(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).json({ message: "student route active" });
        return;
    });
}
exports.healthCheck = healthCheck;
/**
 * createStudent - creates a new student
 *
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns void
 */
function createStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const studentData = (0, class_transformer_1.plainToInstance)(student_1.StudentData, req.body);
        try {
            const validationErrors = yield (0, class_validator_1.validate)(studentData);
            if (validationErrors.length > 0) {
                const mimizedValidationErrors = (0, minimize_class_validator_1.default)(validationErrors);
                res.status(400).json(mimizedValidationErrors);
                return;
            }
            const sanitizedStudentData = {
                contact_details: studentData.contact_details,
                name: studentData.name,
            };
            const result = studentService.createStudent(sanitizedStudentData);
            res.status(201).json(result);
        }
        catch (err) {
            res.status(500).json({
                message: err,
            });
        }
    });
}
exports.createStudent = createStudent;
/**
 * getOneStudent - gets one student document from db using student id
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns
 */
function getOneStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const studentID = Number(req.params.studentID);
        if (studentID == null) {
            res.status(400).json({ message: "Please, provide a student ID" });
            return;
        }
        try {
            const result = yield studentService.getStudentById(studentID);
            if (result == null) {
                res.status(400).json({ message: "Student not found!" });
                return;
            }
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json({
                message: "We couldn't accept your request right now, Please try again later!",
            });
        }
    });
}
exports.getOneStudent = getOneStudent;
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
function getStudentPaginated(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const searchKey = req.query.search_key;
        const page = req.query.page;
        const perPage = req.query.per_page;
        const studentQuery = {};
        if (searchKey != null)
            studentQuery.keyword = (_a = searchKey === null || searchKey === void 0 ? void 0 : searchKey.toLocaleString()) !== null && _a !== void 0 ? _a : "";
        if (page != null)
            studentQuery.skip = (_b = Number(page)) !== null && _b !== void 0 ? _b : 1;
        if (perPage != null)
            studentQuery.take = (_c = Number(perPage)) !== null && _c !== void 0 ? _c : 10;
        try {
            const result = yield studentService.getStudentPagination(studentQuery);
            if (result.count === 0) {
                res.status(400).json({ message: "we couldn't find any student" });
                return;
            }
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json({
                message: "We couldn't accept your request right now, please try again later!",
            });
        }
    });
}
exports.getStudentPaginated = getStudentPaginated;
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
function deleteOneStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const studentID = Number(req.params.studentID);
        if (studentID == null) {
            res.status(400).json({ message: "Please, provide a student ID" });
            return;
        }
        try {
            const result = yield studentService.deleteStudent(studentID);
            if (result == null) {
                res.status(400).json({ message: "Student not found!" });
                return;
            }
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json({
                message: "we have exprienced an error, please try again later!",
            });
        }
    });
}
exports.deleteOneStudent = deleteOneStudent;
exports.default = {
    healthCheck,
    createStudent,
    getOneStudent,
    getStudentPaginated,
    //   updateStudent,
    deleteOneStudent,
};
