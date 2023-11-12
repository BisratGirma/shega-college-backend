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
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const ormconfig_1 = __importDefault(require("./config/ormconfig"));
exports.appDataSource = new typeorm_1.DataSource(ormconfig_1.default.dataSourceOptionsMongoDB);
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    console.time("Time to connect to db");
    yield exports.appDataSource.initialize();
});
connect()
    .then(() => {
    console.clear();
    console.timeEnd("Time to connect to db");
    console.log("connected to db!");
})
    .catch((err) => {
    console.error(err);
    process.exit(1);
});
exports.default = { appDataSource: exports.appDataSource, connect };
