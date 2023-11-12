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
exports.StudentService = void 0;
const server_1 = __importDefault(require("../server"));
const student_model_1 = require("../models/student.model");
const typeorm_1 = require("typeorm");
class StudentService {
    constructor() {
        this.dataSource = server_1.default.appDataSource;
        this.studentRepository = this.dataSource.getRepository(student_model_1.Student);
    }
    // gets all registered students from db
    getAllStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.studentRepository.find();
        });
    }
    // gets a student with a specific id
    getStudentById(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.studentRepository.findOne({ where: { student_id: studentId } });
        });
    }
    // gets a list of students with pagination
    getStudentPagination({ skip, take, keyword, }) {
        return __awaiter(this, void 0, void 0, function* () {
            take = take || 10;
            skip = skip || 0;
            keyword = keyword || "";
            const [result, total] = yield this.studentRepository.findAndCount({
                where: { name: (0, typeorm_1.Like)("%" + keyword + "%") },
                order: { name: "DESC" },
                take: take,
                skip: skip,
            });
            return {
                data: result,
                count: total,
            };
        });
    }
    // creates a new student document on db
    createStudent(newStudentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newStudent = this.studentRepository.create(newStudentData);
            return this.studentRepository.save(newStudent);
        });
    }
    // updates student using student id
    updateStudent(studentId, updatedStudentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield this.getStudentById(studentId);
            if (!student) {
                return null;
            }
            Object.assign(student, updatedStudentData);
            return this.studentRepository.save(student);
        });
    }
    // deletes student using student id
    deleteStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield this.studentRepository.delete(studentId);
            return deleteResult.affected != null && deleteResult.affected > 0;
        });
    }
}
exports.StudentService = StudentService;
