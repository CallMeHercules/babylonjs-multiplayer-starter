import { Scene, ActionManager, ExecuteCodeAction, AbstractMesh, Vector3 } from "@babylonjs/core";

var clicked = false; 
var selectedMesh: AbstractMesh;
var clickedMesh: AbstractMesh;
var selected = false;
var current = new Vector3(0,0,0)
var moving = new Vector3(0,0,0)
export class KeyboardInputManager {
    private readonly _actionManager: ActionManager;
    private _inputMap: { [index: string]: boolean } = {};
    private _registeredActions = new Map<string, ExecuteCodeAction[]>();

    constructor(private readonly _scene: Scene) {
        this._actionManager = new ActionManager(_scene);
        this._actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
                this._inputMap[evt.sourceEvent.key] =
                    evt.sourceEvent.type == "keydown";
            })
        );
        this._actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
                this._inputMap[evt.sourceEvent.key] =
                    evt.sourceEvent.type == "keydown";
            })
        );
        this._scene.actionManager = this._actionManager;
    }

    public addListener(
        key: string,
        onKeyDown: () => void,
        onKeyUp: () => void
    ): [ExecuteCodeAction, ExecuteCodeAction] {
        const keyDownAction = new ExecuteCodeAction(
            ActionManager.OnKeyDownTrigger,
            (event) => {
                if (event.sourceEvent.key === key) {
                    onKeyDown();
                }
            }
        );
        const keyUpAction = new ExecuteCodeAction(
            ActionManager.OnKeyUpTrigger,
            (event) => {
                if (event.sourceEvent.key === key) {
                    onKeyUp();
                }
            }
        );
        this._actionManager.registerAction(keyDownAction);
        this._actionManager.registerAction(keyUpAction);
        return [keyDownAction, keyUpAction];
    }

    public removeListener(action: ExecuteCodeAction): boolean {
        return this._actionManager.unregisterAction(action) as boolean;
    }

    public removeAllListeners(key: string): boolean {
        const actions = this._registeredActions.get(key);
        if (!actions) {
            return false;
        }
        actions.forEach((action) =>
            this._actionManager.unregisterAction(action)
        );
        return true;
    }

    public keyIsDown(key: string): boolean {
        return this._inputMap[key.toLowerCase()];
    }

    public click(pickedMesh: AbstractMesh): void {
        clicked = true;
        moving = pickedMesh.absolutePosition;
        try {
            clickedMesh!.material!.wireframe=false;
        } catch (err) {} //clicked mesh will be null first time
        clickedMesh = pickedMesh;
        if (moving._x == current._x && 
            moving._z == current._y &&
            moving._z == current._z && clicked && selected) {
            console.log('staying put');
            clicked = false;
            selected = false;
            clickedMesh!.material!.wireframe=false;
            selectedMesh = pickedMesh;
        } else if ( clicked && selected ){
            console.log('moving');
            clicked = false;
            selected = false;
            current = moving;
            selectedMesh = pickedMesh;
            selectedMesh!.material!.wireframe=false;
        }
        clickedMesh = pickedMesh;
    }

    public checkClick(): boolean {        
        if (clicked) {
            clicked = false;
            current._isDirty = false;
            try {
                if (clickedMesh.absolutePosition._x == current._x 
                    && clickedMesh.absolutePosition._y == current._y 
                    && clickedMesh.absolutePosition._z == current._z ) {
                    console.log('selected')
                    clickedMesh!.material!.wireframe=true;
                    selected = true;
                }
            } catch (err) {
                return true
            };
            return true;
        }
        return false;
    }

    public checkClickDestination(): Vector3 {
        if (clicked == true) {
            return moving;
        }
        return current;
    }
}
