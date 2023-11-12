"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const __controller_1 = __importDefault(require("../../controller/*.controller"));
const router = (0, express_1.Router)();
/**
 * Client Signup Routes
 */
router.post("/signup-validation", __controller_1.default.healthCheck);
exports.default = router;
