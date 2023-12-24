import { IMessage } from "../../types/chat"
import { ChatBubble } from "./chatBubble";
import { ChatInput } from "./chatInput";

export const Chat: React.FC = () => {
    const messages: IMessage[] = [
        {
            content: "hi",
            author:"par",
            timestamp:"fd"
        },
        {
            content: "hi",
            author:"par",
            timestamp:"fd"
        },
        {
            content: "hi",
            author:"par",
            timestamp:"fd"
        },
    ];
    return (
        <div className="flex flex-col h-full justify-end px-3 py-2">
            <div>
                {messages.map((message)=>{
                    return <ChatBubble message={message}/>
                })}
            </div>
            <ChatInput />
        </div>
    )
}