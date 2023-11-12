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
exports.deleteOneGrade = exports.updateGrade = exports.getGradePaginated = exports.getOneGrade = exports.createGrade = exports.healthCheck = void 0;
const grade_service_1 = require("../services/grade.service");
const class_transformer_1 = require("class-transformer");
const grade_1 = require("../types/grade");
const class_validator_1 = require("class-validator");
const minimize_class_validator_1 = __importDefault(require("../lib/minimize_class_validator"));
const gradeService = new grade_service_1.GradeService();
function healthCheck(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).json({ message: "grade route active" });
        return;
    });
}
exports.healthCheck = healthCheck;
/**
 * createGrade - creates a new grade
 *
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns void
 */
function createGrade(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const gradeData = (0, class_transformer_1.plainToInstance)(grade_1.GradeData, req.body);
        try {
            const validationErrors = yield (0, class_validator_1.validate)(gradeData);
            if (validationErrors.length > 0) {
                const mimizedValidationErrors = (0, minimize_class_validator_1.default)(validationErrors);
                res.status(400).json(mimizedValidationErrors);
                return;
            }
            const sanitizedGradeData = {
                academic_period: gradeData.academic_period,
                course_id: gradeData.course_id,
                grade_letter: gradeData.grade_letter,
            };
            const result = gradeService.createGrade(sanitizedGradeData);
            res.status(201).json(result);
        }
        catch (err) {
            res.status(500).json({
                message: err,
            });
        }
    });
}
exports.createGrade = createGrade;
/**
 * getOneGrade - gets one grade document from db using grade id
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns
 */
function getOneGrade(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const gradeID = Number(req.params.gradeID);
        if (gradeID == null) {
            res.status(400).json({ message: "Please, provide a grade ID" });
            return;
        }
        try {
            const result = yield gradeService.getGradeById(gradeID);
            if (result == null) {
                res.status(400).json({ message: "Grade not found!" });
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
exports.getOneGrade = getOneGrade;
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
function getGradePaginated(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const searchKey = req.query.search_key;
        const page = req.query.page;
        const perPage = req.query.per_page;
        const gradeQuery = {};
        if (searchKey != null)
            gradeQuery.keyword = (_a = searchKey === null || searchKey === void 0 ? void 0 : searchKey.toLocaleString()) !== null && _a !== void 0 ? _a : "";
        if (page != null)
            gradeQuery.skip = (_b = Number(page)) !== null && _b !== void 0 ? _b : 1;
        if (perPage != null)
            gradeQuery.take = (_c = Number(perPage)) !== null && _c !== void 0 ? _c : 10;
        try {
            const result = yield gradeService.getGradePagination(gradeQuery);
            if (result.count === 0) {
                res.status(400).json({ message: "we couldn't find any grade" });
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
exports.getGradePaginated = getGradePaginated;
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
function updateGrade(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const couresID = Number(req.query.coures_id);
        if (couresID == null) {
            res.status(400).json({
                message: "Please, provide grade id of the grade to be updated",
            });
            return;
        }
        const gradeUpdateData = (0, class_transformer_1.plainToInstance)(grade_1.GradeUpdateData, req.body);
        if (Object.keys(gradeUpdateData).length === 0) {
            res
                .status(400)
                .json({ message: "Please, provide update data to a grade!" });
            return;
        }
        try {
            const validationErrors = yield (0, class_validator_1.validate)(gradeUpdateData);
            if (validationErrors.length > 0) {
                const minimizedValidationError = (0, minimize_class_validator_1.default)(validationErrors);
                res.status(400).json(minimizedValidationError);
                return;
            }
            const sanitizedGradeUpdateData = {};
            if (gradeUpdateData.academic_period != null)
                sanitizedGradeUpdateData.academic_period =
                    gradeUpdateData.academic_period;
            if (gradeUpdateData.course_id != null)
                sanitizedGradeUpdateData.course_id = gradeUpdateData.course_id;
            if (gradeUpdateData.grade_letter != null)
                sanitizedGradeUpdateData.grade_letter = gradeUpdateData.grade_letter;
            const result = yield gradeService.updateGrade(Number(couresID), sanitizedGradeUpdateData);
            if (result == null) {
                res.status(400).json({ message: "we couldn't update the grade" });
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
exports.updateGrade = updateGrade;
/**
 * getOneGrade - gets one grade document from db using grade id
 *
 * @param req Express Request object
 * @param res Express Response object
 * @returns
 */
function deleteOneGrade(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const gradeID = Number(req.params.gradeID);
        if (gradeID == null) {
            res.status(400).json({ message: "Please, provide a grade ID" });
            return;
        }
        try {
            const result = yield gradeService.deleteGrade(gradeID);
            if (result == null) {
                res.status(400).json({ message: "Grade not found!" });
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
exports.deleteOneGrade = deleteOneGrade;
exports.default = {
    healthCheck,
    createGrade,
    getOneGrade,
    getGradePaginated,
    updateGrade,
    deleteOneGrade,
};
