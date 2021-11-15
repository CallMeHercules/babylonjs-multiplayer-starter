import {
    Sprite,
    Scene,
    SpriteManager,
} from "@babylonjs/core";

export class CharacterManager {
    constructor() {}
    public createPlayerSprite(id: string, _spriteManager: SpriteManager): Sprite {
        var sprite = new Sprite(id, _spriteManager);
        return sprite;
    }
}
