"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const course_controller_1 = __importDefault(require("../../controller/course.controller"));
const router = (0, express_1.Router)();
router.get("/healthcheck", course_controller_1.default.healthCheck);
router.post("/create", course_controller_1.default.createCourse);
router.get("/get-one/:courseID", course_controller_1.default.getOneCourse);
router.get("/paginate", course_controller_1.default.getCoursePaginated);
router.put("/update", course_controller_1.default.updateCourse);
router.delete("/delete/:courseID", course_controller_1.default.deleteOneCourse);
exports.default = router;
