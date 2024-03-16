import { useContext } from "react";
import { IMessage } from "../../types/chat"
import { ChatBubble } from "./chatBubble";
import { ChatInput } from "./chatInput";
import { RoomContext } from "../../context/RoomContext";

export const Chat: React.FC = () => {
    const { chat } = useContext(RoomContext)
    return (
        <div className="flex flex-col h-full justify-end px-3 py-2">
            <div>
                {chat.messages.map((message: IMessage) => {
                    return <ChatBubble message={message} />
                })}
            </div>
            <ChatInput />
        </div>
    )
}