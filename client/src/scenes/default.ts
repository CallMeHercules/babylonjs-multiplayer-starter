import {
    Engine,
    Scene,
    SceneLoader,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    StandardMaterial,
} from "@babylonjs/core";
import { CreateSceneClass } from "../createScene";
import tile from './../meshs/tile.glb';

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

        // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new HemisphericLight(
            "light",
            new Vector3(0, 1, 0),
            scene
        );

        // Our built-in 'ground' shape.
        const square = 5;
        var grid = {
            'h' : 8,
            'w' : 8
        };
        // var ground =  SceneLoader.ImportMesh(
        //     "",
        //     "",
        //     tile,
        //     scene,
        // );
        var ground = MeshBuilder.CreateTiledGround("tiled ground", {xmin: -3, zmin: -3, xmax: 3, zmax: 3, subdivisions: grid}, scene);;
        // for (let v = 0; v < 1; v++) {
        //     for (let width = -square; width <= square; width++) {
        //         for (let length = -square; length <= square; length++) {
        //                 SceneLoader.ImportMesh("", "", tile, scene, function (newMeshes) {
        //                 ground = newMeshes[v];
        //                 ground.isPickable = true;
        //                 ground.scaling.x = 0.99;
        //                 ground.scaling.y = 0.99;
        //                 ground.scaling.z = 0.99;
        //                 ground.position.copyFromFloats((ground.scaling.x+1.01)*width + (square * 2), 0, ((ground.scaling.x+1.01)*length) + (square * 2));
        //             });
        //         }
        //     }
        // }
        // var grid = {
        //     'h' : 8,
        //     'w' : 8
        // };
        // const ground = MeshBuilder.CreateTiledGround("tiled ground", {xmin: -3, zmin: -3, xmax: 3, zmax: 3, subdivisions: grid}, scene);

        // Load a texture to be used as the ground material
        // const groundMaterial = new StandardMaterial("ground material", scene);

        // ground.material = groundMaterial;

        return scene;
    };
}

export default new DefaultSceneWithTexture();
