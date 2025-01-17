import * as io from "socket.io-client";
import { Engine } from "@babylonjs/core/Engines/engine";
import { SpriteManager, PointerInfo, Ray } from "@babylonjs/core";
import { getSceneModuleWithName } from "./createScene";
import { ServerConnection } from "./ServerConnection";
import { Game } from "./Game";
import { CharacterManager } from "./CharacterManager";
import { KeyboardInputManager } from "./KeyboardInputManager";
import { Player } from "./Player";
import { PLAYER_INITIAL_STATE } from "./State";
import sprite from './sprites/test.png'


const getModuleToLoad = (): string | undefined => {
    // ATM using location.search
    if (!location.search) {
        return;
    } else {
        return location.search.substr(location.search.indexOf("scene=") + 6);
    }
};

export const babylonInit = async (): Promise<void> => {
    // get the module to load
    const moduleName = getModuleToLoad();
    const createSceneModule = await getSceneModuleWithName("default");

    // Execute the pretasks, if defined
    await Promise.all(createSceneModule.preTasks || []);
    // Get the canvas element
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    // Generate the BABYLON 3D engine
    const engine = new Engine(canvas, true);

    // Create the scene
    const scene = await createSceneModule.createScene(engine, canvas);
    // Register a render loop to repeatedly render the scene
    let divFps = document.getElementById("fps") as HTMLDivElement;
    engine.runRenderLoop(function () {
        divFps.innerHTML = engine.getFps().toFixed() + " fps";
        scene.render();
        scene.onPointerDown = function(_pickResult,evt){
            if (evt.pickedMesh?.uniqueId){
                evt.hit = true;
                keyboardInputManager.click(evt.pickedMesh)
            }
            if (evt.pickedSprite){
                console.log(evt.pickedSprite)
            }
        }
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });
    
    const characterManager = new CharacterManager();
    const keyboardInputManager = new KeyboardInputManager(scene);
    const MAX_SAFE_SPRITE_COUNT = 100; //largest known value for SpriteManager without slowdown of fps
    
    const spriteManager = new SpriteManager("playerManager"+MAX_SAFE_SPRITE_COUNT, sprite, MAX_SAFE_SPRITE_COUNT, {width:150, height:193.9}, scene);

    const serverConnection = new ServerConnection(io("http://localhost:8079"));
    console.log("create new player")
    const player = new Player("player", scene, characterManager, keyboardInputManager, spriteManager, PLAYER_INITIAL_STATE);
    const game = new Game(serverConnection, characterManager, player, scene, spriteManager);

    const update = () => {
        // Update game
        game.update();
    };
    console.log('sending state')
    setInterval(() => game.sendClientState());

    scene.onBeforeRenderObservable.add(() => update());
};

babylonInit().then(() => {
    // scene started rendering, everything is initialized
});
