import {
    Engine,
    Scene,
    SceneLoader,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    StandardMaterial,
} from "@babylonjs/core";
import { CreateSceneClass } from "../createScene";
import tile from '../meshs/tile.glb';
// required imports
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";
const square = 5;
export class DefaultSceneWithTexture implements CreateSceneClass {
    createScene = async (
        engine: Engine,
        canvas: HTMLCanvasElement
    ): Promise<Scene> => {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new Scene(engine);

        // This creates and positions a free camera (non-mesh)
        const camera = new ArcRotateCamera(
            "my first camera",
            0,
            Math.PI / 3,
            10,
            new Vector3(0, 0, 0),
            scene
        );

        // camera.lowerBetaLimit = 1.1;
        // camera.upperBetaLimit = 1.1;
        // camera.upperRadiusLimit = 20;
        // camera.lowerRadiusLimit = 20;
        camera.setTarget(Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight(
            "light",
            new Vector3(0, 1, 0),
            scene
        );

        var ground;
        for (let v = 0; v < 1; v++) {
            for (let width = -square; width <= square; width++) {
                for (let length = -square; length <= square; length++) {
                    SceneLoader.ImportMesh("", "", tile, scene, function (newMeshes) {
                        ground = newMeshes[v];
                        ground.isPickable = true;
                        ground.scaling = new Vector3(0.99, 0.99, 0.99)
                        ground.position.copyFromFloats((ground.scaling.x+1.01)*width + (square * 2), 0, ((ground.scaling.x+1.01)*length) + (square * 2));
                    });
                }
            }
        }	

        const groundMaterial = new StandardMaterial("ground material", scene);
// 
        // ground.material = groundMaterial;
        // ground.material.wireframe = true;
        return scene;
    };
    
}

export default new DefaultSceneWithTexture();