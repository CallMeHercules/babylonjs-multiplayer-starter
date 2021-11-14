"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(_logger) {
        this._logger = _logger;
        this._gameState = { players: [] };
        this._logger.log("created game");
    }
    update() {
        this._gameState.players.forEach((player) => {
            player.sendGameState(this._gameState);
        });
    }
    get players() {
        return this._gameState.players;
    }
    addPlayer(player) {
        this._gameState.players.push(player);
        this._logger.userLog(player.id, "joined game");
    }
    removePlayer(id) {
        this._gameState.players = this._gameState.players.filter((player) => id !== player.id);
        this._logger.userLog(id, "left game");
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map