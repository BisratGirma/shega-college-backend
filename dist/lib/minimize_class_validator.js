"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function minimizeClassValidatorError(error) {
    let errObj = [];
    error.forEach((_err) => {
        _err.constraints;
        errObj.push(Object.values(_err === null || _err === void 0 ? void 0 : _err.constraints)[0]);
    });
    return {
        statusCode: 400,
        error: errObj,
    };
}
exports.default = minimizeClassValidatorError;
