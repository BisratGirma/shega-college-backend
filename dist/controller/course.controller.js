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
exports.deleteOneCourse = exports.updateCourse = exports.getCoursePaginated = exports.getOneCourse = exports.createCourse = exports.healthCheck = void 0;
const course_service_1 = require("../services/course.service");
const class_transformer_1 = require("class-transformer");
const course_1 = require("../types/course");
const class_validator_1 = require("class-validator");
const minimize_class_validator_1 = __importDefault(require("../lib/minimize_class_validator"));
const courseService = new course_service_1.CourseService();
function healthCheck(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).json({ message: "course route active" });
        return;
    });
}
exports.healthCheck = healthCheck;
/**
 * createCourse - creates a new course
 *
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns void
 */
function createCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const courseData = (0, class_transformer_1.plainToInstance)(course_1.CourseData, req.body);
        try {
            const validationErrors = yield (0, class_validator_1.validate)(courseData);
            if (validationErrors.length > 0) {
                const mimizedValidationErrors = (0, minimize_class_validator_1.default)(validationErrors);
                res.status(400).json(mimizedValidationErrors);
                return;
            }
            const sanitizedCourseData = {
                course_code: courseData.course_code,
                credit_hours: courseData.credit_hours,
                description: courseData.description,
                title: courseData.title,
            };
            const result = courseService.createCourse(sanitizedCourseData);
            res.status(201).json(result);
        }
        catch (err) {
            res.status(500).json({
                message: err,
            });
        }
    });
}
exports.createCourse = createCourse;
/**
 * getOneCourse - gets one course document from db using course id
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns
 */
function getOneCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const courseID = Number(req.params.courseID);
        if (courseID == null) {
            res.status(400).json({ message: "Please, provide a course ID" });
            return;
        }
        try {
            const result = yield courseService.getCourseById(courseID);
            if (result == null) {
                res.status(400).json({ message: "Course not found!" });
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
exports.getOneCourse = getOneCourse;
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
function getCoursePaginated(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const searchKey = req.query.search_key;
        const page = req.query.page;
        const perPage = req.query.per_page;
        const courseQuery = {};
        if (searchKey != null)
            courseQuery.keyword = (_a = searchKey === null || searchKey === void 0 ? void 0 : searchKey.toLocaleString()) !== null && _a !== void 0 ? _a : "";
        if (page != null)
            courseQuery.skip = (_b = Number(page)) !== null && _b !== void 0 ? _b : 1;
        if (perPage != null)
            courseQuery.take = (_c = Number(perPage)) !== null && _c !== void 0 ? _c : 10;
        try {
            const result = yield courseService.getCoursePagination(courseQuery);
            if (result.count === 0) {
                res.status(400).json({ message: "we couldn't find any course" });
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
exports.getCoursePaginated = getCoursePaginated;
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
function updateCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const couresID = Number(req.query.coures_id);
        if (couresID == null) {
            res.status(400).json({
                message: "Please, provide course id of the course to be updated",
            });
            return;
        }
        const courseUpdateData = (0, class_transformer_1.plainToInstance)(course_1.CourseUpdateData, req.body);
        if (Object.keys(courseUpdateData).length === 0) {
            res
                .status(400)
                .json({ message: "Please, provide update data to a course!" });
            return;
        }
        try {
            const validationErrors = yield (0, class_validator_1.validate)(courseUpdateData);
            if (validationErrors.length > 0) {
                const minimizedValidationError = (0, minimize_class_validator_1.default)(validationErrors);
                res.status(400).json(minimizedValidationError);
                return;
            }
            const sanitizedCourseUpdateData = {};
            if (courseUpdateData.course_code != null)
                sanitizedCourseUpdateData.course_code = courseUpdateData.course_code;
            if (courseUpdateData.credit_hours != null)
                sanitizedCourseUpdateData.credit_hours = courseUpdateData.credit_hours;
            if (courseUpdateData.description != null)
                sanitizedCourseUpdateData.description = courseUpdateData.description;
            if (courseUpdateData.title != null)
                sanitizedCourseUpdateData.title = courseUpdateData.title;
            const result = yield courseService.updateCourse(Number(couresID), sanitizedCourseUpdateData);
            if (result == null) {
                res.status(400).json({ message: "we couldn't update the course" });
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
exports.updateCourse = updateCourse;
/**
 * getOneCourse - gets one course document from db using course id
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns
 */
function deleteOneCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const courseID = Number(req.params.courseID);
        if (courseID == null) {
            res.status(400).json({ message: "Please, provide a course ID" });
            return;
        }
        try {
            const result = yield courseService.deleteCourse(courseID);
            if (result == null) {
                res.status(400).json({ message: "Course not found!" });
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
exports.deleteOneCourse = deleteOneCourse;
exports.default = {
    healthCheck,
    createCourse,
    getOneCourse,
    getCoursePaginated,
    updateCourse,
    deleteOneCourse,
};
