"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSocket = void 0;
const Constants_1 = require("./Constants");
class ClientSocket {
    constructor(_logger, _socket) {
        this._logger = _logger;
        this._socket = _socket;
        this._logger.userLog(_socket.id.toString(), "connected");
    }
    get id() {
        return this._socket.id;
    }
    onRecieveState(callback) {
        this._socket.on(Constants_1.WebsocketEvents.ClientState, (newState) => callback(newState));
    }
    sendGameState(state) {
        this._socket.emit(Constants_1.WebsocketEvents.GameState, this.decodeGameState(state));
    }
    decodeGameState(state) {
        return {
            players: state.players.map((player) => {
                return {
                    id: player.id,
                    state: player.state,
                };
            }),
        };
    }
}
exports.ClientSocket = ClientSocket;
//# sourceMappingURL=ClientSocket.js.map