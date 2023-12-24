import { Socket } from "socket.io";
import { v4 as uuidV4 } from 'uuid'

const rooms: Record<string, string[]> = {}
const chats: Record<string, IMessage[]> = {}
interface IRoomParams {
    roomId: string,
    peerId: string,
}
interface IMessage {
    content: string;
    author: string;
    timestamp: string;
}
export const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = uuidV4()
        rooms[roomId] = []
        socket.join(roomId)
        console.log('room created');

        socket.emit("room-created", { roomId })

    }
    const joinRoom = ({ roomId, peerId }: IRoomParams) => {
        if (!rooms[roomId]) rooms[roomId] = []
        if(!chats[roomId]) chats[roomId] = []
        socket.emit("get-messages",chats[roomId])
        rooms[roomId].push(peerId)
        socket.join(roomId)
        console.log(peerId)
        socket.to(roomId).emit('user-joined', { peerId })
        socket.to(roomId).emit('get-users', {
            roomId,
            participants: rooms[roomId]
        })


        socket.on('disconnect', () => {
            leaveRoom({ roomId, peerId })
        })
    }
    const leaveRoom = ({ peerId, roomId }: IRoomParams) => {
        rooms[roomId] = rooms[roomId].filter(id => id !== peerId)
        socket.to(roomId).emit('user-disconnected', peerId)
    }
    const startSharing = ({ peerId, roomId }: IRoomParams) => {
        socket.to(roomId).emit("user-started-sharing", peerId)
    }
    const stopSharing = ({ peerId, roomId }: IRoomParams) => {
        socket.to(roomId).emit('user-stopped-sharing', peerId)
    }
    const addMessage = (roomId: string, message: IMessage) => {
        if(!chats[roomId]) chats[roomId] = []
        chats[roomId].push(message)
        socket.to(roomId).emit("add-message", message)
    }
    socket.on('create-room', createRoom)
    socket.on("join-room", joinRoom)
    socket.on("start-sharing", startSharing);
    socket.on("stop-sharing", stopSharing);
    socket.on("send-message", addMessage)
}