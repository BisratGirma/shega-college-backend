"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Load Module Dependencies
 *
 */
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
const cors_1 = __importDefault(require("cors"));
const connect_timeout_1 = __importDefault(require("connect-timeout"));
const index_1 = __importDefault(require("./api/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, connect_timeout_1.default)("20s"));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Accept, Content-Type, access-control-allow-origin, x-api-applicationid, authorization");
    res.header("Access-Control-Allow-Methods", "OPITIONS, GET, PUT, PATCH, POST, DELETE");
    next();
});
// Parser JSON body Requests
app.use(express_1.default.json({ limit: "100kb" }));
(0, index_1.default)(app);
app.use(function notFound(err, req, res, next) {
    return res.json({ message: err.message });
});
const ENVIRONMENT = app.get("env");
const PORT = 8008;
// Listen on Port
app.listen(PORT, function connectionListener() {
    console.log(chalk_1.default.green.italic(`Hi there! I'm listening on port ${PORT} in ${ENVIRONMENT} mode.`));
});
// Export app interface
exports.default = app;
