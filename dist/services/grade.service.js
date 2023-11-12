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
exports.GradeService = void 0;
const server_1 = __importDefault(require("../server"));
const grade_model_1 = require("../models/grade.model");
const typeorm_1 = require("typeorm");
class GradeService {
    constructor() {
        this.dataSource = server_1.default.appDataSource;
        this.gradeRepository = this.dataSource.getRepository(grade_model_1.Grade);
    }
    // gets all registered grades from db
    getAllGrades() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.gradeRepository.find();
        });
    }
    // gets a grade with a specific id
    getGradeById(gradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.gradeRepository.findOne({ where: { grade_id: gradeId } });
        });
    }
    // gets a list of grades with pagination
    getGradePagination({ skip, take, keyword, }) {
        return __awaiter(this, void 0, void 0, function* () {
            take = take || 10;
            skip = skip || 0;
            keyword = keyword || "";
            const [result, total] = yield this.gradeRepository.findAndCount({
                where: { academic_period: (0, typeorm_1.Like)("%" + keyword + "%") },
                order: { academic_period: "DESC" },
                take: take,
                skip: skip,
            });
            return {
                data: result,
                count: total,
            };
        });
    }
    // creates a new grade document on db
    createGrade(newGradeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newGrade = this.gradeRepository.create(newGradeData);
            return this.gradeRepository.save(newGrade);
        });
    }
    // updates grade using grade id
    updateGrade(gradeId, updatedGradeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const grade = yield this.getGradeById(gradeId);
            if (!grade) {
                return null;
            }
            Object.assign(grade, updatedGradeData);
            return this.gradeRepository.save(grade);
        });
    }
    // deletes grade using grade id
    deleteGrade(gradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield this.gradeRepository.delete(gradeId);
            return deleteResult.affected != null && deleteResult.affected > 0;
        });
    }
}
exports.GradeService = GradeService;
