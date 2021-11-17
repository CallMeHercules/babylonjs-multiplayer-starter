import { Vector3 } from "@babylonjs/core";

export interface ClientState {
    position: [number, number, number];
}

export interface GameState {
    players: { id: string; state: ClientState }[];
}

export interface ActiveTile {
    position: Vector3;
}

export const GAME_INITIAL_STATE: GameState = {
    players: [],
};

export const PLAYER_INITIAL_STATE: ClientState = {
    position: [0, 1, 0],
};

export const STARTING_TILE: ActiveTile = {
    position: new Vector3(0, 0, 0),
};
