import {
    Sprite,
    Scene,
    SpriteManager,
} from "@babylonjs/core";
import img from "./sprites/test.png";

export class CharacterManager {
    constructor(private readonly _scene: Scene ) {}
    // capacity = 10
    public createPlayerSprite(id: string, _spriteManager: SpriteManager): Sprite {
        var sprite = new Sprite(id, _spriteManager);
        console.log(sprite)
        return sprite;
    }
}
