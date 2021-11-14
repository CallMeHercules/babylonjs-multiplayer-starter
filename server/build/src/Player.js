"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(_clientSocket, initialState) {
        this._clientSocket = _clientSocket;
        this._maxHealth = 100;
        this._health = this._maxHealth;
        this.id = this._clientSocket.id;
        this._state = initialState;
        this._clientSocket.onRecieveState((newState) => this.updateState(newState));
    }
    updateState(newState) {
        this._state = newState;
    }
    get state() {
        return this._state;
    }
    sendGameState(gameState) {
        const otherPlayers = gameState.players.filter((player) => this.id != player.id);
        const filteredState = Object.assign(Object.assign({}, gameState), { players: otherPlayers });
        this._clientSocket.sendGameState(filteredState);
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map