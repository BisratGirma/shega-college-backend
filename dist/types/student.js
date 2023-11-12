"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentUpdateData = exports.StudentData = void 0;
const class_validator_1 = require("class-validator");
class StudentData {
}
exports.StudentData = StudentData;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentData.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentData.prototype, "contact_details", void 0);
class StudentUpdateData {
}
exports.StudentUpdateData = StudentUpdateData;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentUpdateData.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StudentUpdateData.prototype, "contact_details", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], StudentUpdateData.prototype, "courses", void 0);
