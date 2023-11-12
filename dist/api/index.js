"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __routes_1 = __importDefault(require("./routes/*.routes"));
function initRoutes(app) {
    app.use("/*", __routes_1.default);
}
exports.default = initRoutes;
