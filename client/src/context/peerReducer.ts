import { MediaConnection } from "peerjs";
import { ADD_USER, REMOVE_USER } from "./peerActions";

export type PeerState = Record<string, {stream: MediaStream,call: MediaConnection}>;

type PeerAction = 
| {
    type: typeof ADD_USER;
    payload: {peerId: string, stream: MediaStream, call: MediaConnection};
}
| {
    type: typeof REMOVE_USER;
    payload: { peerId: string}
}

export const peerReducer = (state: PeerState, action: PeerAction) => {
    switch(action.type){
        case ADD_USER:
            return {
                ...state,
                [action.payload.peerId]: {
                    stream: action.payload.stream,
                    call: action.payload.call
                }
            }
        case REMOVE_USER:
            const {[action.payload.peerId]: deleted, ...rest} = state
            return rest
        default:
            return state
    }
}