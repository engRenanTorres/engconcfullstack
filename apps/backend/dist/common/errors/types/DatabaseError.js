"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseError = void 0;
class DataBaseError extends Error {
    constructor(message, code) {
        super();
        this.message = message;
        this.code = code;
    }
}
exports.DataBaseError = DataBaseError;
//# sourceMappingURL=DatabaseError.js.map