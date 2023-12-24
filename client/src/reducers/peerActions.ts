import { MediaConnection } from "peerjs";

export const ADD_USER = "ADD_USER" as const;
export const REMOVE_USER = "REMOVE_USER" as const;

export const addPeerAction = (peerId: string, stream: MediaStream, call: MediaConnection) =>  ({type: ADD_USER, payload:{peerId,stream,call}})
export const removePeerAction = (peerId: string) =>  ({type: REMOVE_USER, payload:{peerId}})