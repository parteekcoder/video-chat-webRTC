import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { VideoPlayer } from "../components/VideoPlayer";
import { PeerState } from "../reducers/peerReducer";
import { ShareScreenButtoon } from "../components/ShareScreenButton";
import { ChatButton } from "../components/ChatButton";
import { Chat } from "../components/chat/Chat";

function Room() {
  const { id } = useParams()
  const { ws, chat, me, stream, peers, toggleChat, shareScreen, screenStream, screenSharingId, setRoomId } = useContext(RoomContext)

  useEffect(() => {
    if (me) me.on('open', () => {
      ws.emit('join-room', { roomId: id, peerId: me._id })
    })
  }, [me, id])

  useEffect(() => {
    setRoomId(id);
  }, [id, setRoomId]);
  const screenSharingVideo = me?.id === screenSharingId ? screenStream : peers[screenSharingId]?.stream
  const { [screenSharingId]: sharing, ...peersToShow } = peers


  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex grow">
        {screenSharingId && (
          <div className="w-4/5 pr-4">
            <VideoPlayer stream={screenSharingVideo} />
          </div>
        )}
        <div className={`grid gap-4 ${screenSharingId ? "w-1/5 grid-col-1" : "grid-cols-4"}`}>
          <VideoPlayer stream={stream} />
          {Object.values(peersToShow as PeerState).map((peer, ind) => (
            <VideoPlayer key={ind} stream={peer.stream} />

          ))}
        </div>
        {
          chat.isChatOpen && (<div className="border-l-2 z-50 py-28">
            <Chat />
          </div>)
        }

      </div>

      <div className="fixed bottom-0 px-6 py-5 h-28 w-full flex justify-center border-t-2">
        <ShareScreenButtoon onClick={shareScreen} />
        <ChatButton onClick={toggleChat} />
      </div>
    </div>
  );
}

export default Room;
