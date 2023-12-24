import React, { useContext, useEffect } from 'react';
import socketIO from 'socket.io-client'
import { RoomContext } from '../context/RoomContext';

const ws = 'http://localhost:8080'

const CreateButton: React.FC = ()=> {
  const {ws} = useContext(RoomContext)
  const joinRoom = () => {
    ws.emit("create-room")
  }
  return (
      <button onClick={joinRoom} className='bg-rose-400 p-4 rounded-lg text-xl hover:bg-rose-600 text-white w-[100%]'>Start new Meeting</button>
  );
}

export default CreateButton;
