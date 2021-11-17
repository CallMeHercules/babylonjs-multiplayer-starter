import {
    Sprite,
    SpriteManager,
} from "@babylonjs/core";

export class CharacterManager {
    constructor() {}
    public createPlayerSprite(id: string, _spriteManager: SpriteManager): Sprite {
        var sprite = new Sprite(id, _spriteManager);
        sprite.size = 2
        sprite.isPickable = true;
        return sprite;
    }
}
