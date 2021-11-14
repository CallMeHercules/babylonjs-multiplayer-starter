import { Sprite, Scene, SpriteManager } from "@babylonjs/core";
import { CharacterManager } from "./CharacterManager";
import { ClientState, PLAYER_INITIAL_STATE } from "./State";

export class NetworkPlayer {
    private readonly _sprite: Sprite;
    private _state: ClientState = PLAYER_INITIAL_STATE;

    constructor(
        public readonly id: string,
        initialState: ClientState,
        characterManager: CharacterManager,
        _scene: Scene,
        _spriteManager: SpriteManager,
        
    ) {
        this._sprite = characterManager.createPlayerSprite(id, _spriteManager);
        this.updateState(initialState);
    }

    public updateState(newState: ClientState) {
        this._state = newState;
        const [x, y, z] = newState.position;
        this._sprite.position.x = x;
        this._sprite.position.y = y;
        this._sprite.position.z = z;
    }

    public disconnect() {
        console.log('disposed')
        this._sprite.dispose();
    }
}
