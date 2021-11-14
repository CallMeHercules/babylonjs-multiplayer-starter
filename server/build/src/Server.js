"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const socket_io_1 = __importDefault(require("socket.io"));
const ClientSocket_1 = require("./ClientSocket");
const Player_1 = require("./Player");
const Game_1 = require("./Game");
const TICKRATE = 30;
const TICK_INTERVAL = 1000 / TICKRATE;
class Server {
    constructor(_logger, _port, _app, _http) {
        this._logger = _logger;
        this._port = _port;
        this._app = _app;
        this._http = _http;
        this._io = (0, socket_io_1.default)(this._http);
        this._game = new Game_1.Game(this._logger);
        this.listenWebsocket();
        this.listenStatic();
        setInterval(() => this.updateGame(), TICK_INTERVAL);
        this._logger.log(`Server is running at https://localhost:${this._port}`);
    }
    updateGame() {
        this._game.update();
    }
    listenStatic() {
        this._http.listen(8079, "127.0.0.1");
    }
    listenWebsocket() {
        this._io.on(`connection`, (socket) => {
            const clientSocket = new ClientSocket_1.ClientSocket(this._logger, socket);
            const player = new Player_1.Player(clientSocket, { position: [0, 1, 0] });
            this._game.addPlayer(player);
            socket.on("disconnect", () => {
                this._game.removePlayer(player.id);
                this._logger.userLog(socket.id.toString(), "disconnected");
            });
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map