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
exports.CourseService = void 0;
const server_1 = __importDefault(require("../server"));
const course_model_1 = require("../models/course.model");
const typeorm_1 = require("typeorm");
class CourseService {
    constructor() {
        this.dataSource = server_1.default.appDataSource;
        this.courseRepository = this.dataSource.getRepository(course_model_1.Course);
    }
    // gets all registered courses from db
    getAllCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courseRepository.find();
        });
    }
    // gets a course with a specific id
    getCourseById(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courseRepository.findOne({ where: { course_id: courseId } });
        });
    }
    // gets a list of courses with pagination
    getCoursePagination({ skip, take, keyword, }) {
        return __awaiter(this, void 0, void 0, function* () {
            take = take || 10;
            skip = skip || 0;
            keyword = keyword || "";
            const [result, total] = yield this.courseRepository.findAndCount({
                where: { title: (0, typeorm_1.Like)("%" + keyword + "%") },
                order: { title: "DESC" },
                take: take,
                skip: skip,
            });
            return {
                data: result,
                count: total,
            };
        });
    }
    // creates a new course document on db
    createCourse(newCourseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCourse = this.courseRepository.create(newCourseData);
            return this.courseRepository.save(newCourse);
        });
    }
    // updates course using course id
    updateCourse(courseId, updatedCourseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.getCourseById(courseId);
            if (!course) {
                return null;
            }
            Object.assign(course, updatedCourseData);
            return this.courseRepository.save(course);
        });
    }
    // deletes course using course id
    deleteCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield this.courseRepository.delete(courseId);
            return deleteResult.affected != null && deleteResult.affected > 0;
        });
    }
}
exports.CourseService = CourseService;
