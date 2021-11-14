import { ClientState, GameState, PLAYER_INITIAL_STATE } from "./State";
import { WebsocketEvents } from "./Constants";

export class ServerConnection {
    constructor(private readonly _socket: SocketIOClient.Socket) {
        this._socket.on("connect", () => {
            console.log(`Connected to server!`);
        });
    }

    public sendClientState(clientState: ClientState) {
        if (isNaN(clientState.position[0])) { //this should really be imported in the state PLAYER_STATE_INTERFACE
            // clientState = PLAYER_INITIAL_STATE
            // console.log('still have an error')
            clientState.position[0] = 0;
            clientState.position[1] = 1;
            clientState.position[2] = 0;
        }
        this._socket.emit(WebsocketEvents.ClientState, clientState);
    }

    public onRecieveState(callback: (newState: GameState) => void) {
        
        this._socket.on(WebsocketEvents.GameState, (state: GameState) =>
            callback(state),
        );
    }

    public onDisconnect(callback: () => void) {
        this._socket.on("disconnect", () => {
            console.log(`Disconnected from server!`);
            callback();
        });
    }
}
