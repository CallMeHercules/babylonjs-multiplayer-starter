"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    log(message) {
        console.log(`[log]: ${message}`);
    }
    userLog(user, message) {
        console.log(`[log] [${user}]: ${message}`);
    }
    warn(message) {
        console.log(`[warn]: ${message}`);
    }
    error(message) {
        console.log(`[ERROR]: ${message}`);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map