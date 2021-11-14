"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const Server_1 = require("./Server");
const Logger_1 = require("./Logger");
const PORT = 8079;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:8081',
    credentials: true
}));
const httpServer = http_1.default.createServer(http_1.default);
const logger = new Logger_1.Logger();
const server = new Server_1.Server(logger, PORT, app, httpServer);
//# sourceMappingURL=index.js.map