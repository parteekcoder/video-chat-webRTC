import CreateButton from '../components/CreateButton';

import '../App.css';
import { useNavigate } from 'react-router-dom';
import { LegacyRef, useRef } from 'react';
function Home() {
  const navigate = useNavigate();
  const ref = useRef<any>()
  const joinRoom = () => {
    navigate(`/room/${ref.current.value}`)
  }
  return (
    <div className="App flex flex-col items-center justify-center w-screen h-screen gap-5 px-[40%]">
      <input className='border rounded border-rose-600 px-10 py-2 w-100' ref={ref}/>
      <button onClick={joinRoom} className='bg-rose-400 p-4 rounded-lg text-xl hover:bg-rose-600 text-white w-[100%]'>join Meet</button>
      <CreateButton/>
    </div>
  );
}

export default Home;
