import { useRouter } from 'next/router'
import Image from 'next/image'
import profile from '../../public/meetcamera.jpg'
import { MdCallEnd } from 'react-icons/md'
import { BiVideo, BiVideoOff, BiMicrophone, BiMicrophoneOff } from 'react-icons/bi'
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { BsRecordBtn } from 'react-icons/bs'
import {
    useAudio,
    useLobby,
    useMeetingMachine,
    usePeers,
    useRoom,
    useVideo,
} from "@huddle01/react/hooks";
import { useEventListener } from "@huddle01/react";
import { Audio, Video } from "@huddle01/react/components";


export default function MeetID() {
    const router = useRouter();
    const meet_id = router.query.meet_id;
    const time = router.query.time;
    const [isActive, setIsActive] = useState(false); // For Video
    const [isActive2, setIsActive2] = useState(false); // For Mic
    const [isActive3, setIsActive3] = useState(false); // For Mic
    var today = new Date();  // Getting Current Time 


    const videoRef = useRef(null);

    const { state, send } = useMeetingMachine();


    // Event Listner
    useEventListener("lobby:cam-on", () => {
        if (state.context.camStream && videoRef.current)
            videoRef.current.srcObject = state.context.camStream;
    });

    useEventListener("lobby:joined", () => {
        console.log("lobby:joined")
    })



    const { joinLobby } = useLobby();
    const {
        fetchAudioStream,
        produceAudio,
        stopAudioStream,
        stopProducingAudio,
        stream: micStream,
    } = useAudio();
    const {
        fetchVideoStream,
        produceVideo,
        stopVideoStream,
        stopProducingVideo,
        stream: camStream,
    } = useVideo();
    const { joinRoom, leaveRoom } = useRoom();

    const { peers } = usePeers();

    useEffect(() => {
        console.log(peers);
    }, [])




    return <>
        <div className='bg-[#212121] h-screen '>
            <div className='px-10 fixed py-2 flex justify-between w-screen'>
                <h1 className='pt-2 bg-gray-900 bg-opacity-70 bg-transparent font-semibold'>{("0" + today.getHours()).slice(-2) + ":" + today.getMinutes()} | {meet_id}</h1>

                {/* VIDEO CAMERA  */}
                <div className="">
                    {!isActive3 ? <button className='p-2 px-4 border mr-4 rounded-full font-bold flex justify-center items-center' onClick={() => {
                        setIsActive3(!isActive3)
                    }} ><BsRecordBtn className='mr-2' size='20' />Record</button>
                        :
                        <button className='p-2 px-4 border-2 border-[#E62020] mr-4 rounded-full font-bold flex justify-center items-center text-[#FF0000]' onClick={() => {
                            setIsActive3(!isActive3)
                        }} ><BsRecordBtn className='mr-2' size='20' /> Recording</button>
                    }
                </div>

            </div>

            <div>
                <div className="grid grid-cols-3 py-14 justify-center items-center px-8 gap-5">
                    <video className='justify-start items-center rounded-xl w-[50rem]' ref={videoRef} autoPlay muted></video>
                    {Object.values(peers)
                        .filter((peer) => peer.cam)
                        .map((peer) => (
                            <Video
                                key={peer.peerId}
                                peerId={peer.peerId}
                                track={peer.cam}
                                debug
                            />
                        ))}
                    {Object.values(peers)
                        .filter((peer) => peer.mic)
                        .map((peer) => (
                            <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
                        ))}
                </div>
            </div>

            {/* CONTROLS */}
            <div className='bottom-3 sticky flex justify-center space-x-3 cursor-pointer'>
                <Link href="/meet"><div className='bg-red-600 hover:bg-red-700 p-2 rounded-3xl px-3'>
                    <MdCallEnd className='text-2xl ' />
                </div></Link>

                {/* VIDEO CAMERA  */}
                <div className="">
                    {isActive ? <div className='p-2 rounded-3xl bg-gray-600'><BiVideo className='text-2xl' onClick={() => {
                        setIsActive(!isActive)
                        stopVideoStream();
                    }} /></div> :
                        <div className='p-2 rounded-3xl bg-red-600 hover:bg-red-700'><BiVideoOff className='text-2xl' onClick={() => {
                            setIsActive(!isActive)
                            fetchVideoStream();
                        }} /></div>
                    }
                </div>

                <div className="cursor-pointer">
                    {isActive2 ? <div className='p-2 rounded-3xl bg-gray-600' ><BiMicrophone className='text-2xl ' onClick={() => {
                        setIsActive2(!isActive2)
                        stopAudioStream()
                    }} /></div> :
                        <div className='p-2 rounded-3xl bg-red-600 hover:bg-red-700' ><BiMicrophoneOff className='text-2xl' onClick={() => {
                            setIsActive2(!isActive2)
                            fetchAudioStream();
                        }} /></div>
                    }
                </div>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                    onClick={() => produceVideo(camStream)
                    }>
                    produceVideo
                </button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                    onClick={() => produceAudio(micStream)
                    }>
                    produceAudio
                </button>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                    onClick={joinRoom}
                >
                    Join room
                </button>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                    onClick={() => stopProducingVideo()}>
                    stopVideo
                </button>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                    onClick={() => stopProducingAudio()}>
                    stopAudio
                </button>
            </div>
        </div>
    </>
}


// import { useEffect, useRef, useState } from "react";

// import { useEventListener, useHuddle01 } from "@huddle01/react";
// import { Audio, Video } from "@huddle01/react/components";
// import { useRecorder } from '@huddle01/react/app-utils'
// import { useRouter } from "next/router";

// import axios from "axios";
// /* Uncomment to see the Xstate Inspector */
// // import { Inspect } from '@huddle01/react/components';

// import {
//     useAudio,
//     useLobby,
//     useMeetingMachine,
//     usePeers,
//     useRoom,
//     useVideo,
// } from "@huddle01/react/hooks";



// export default function MeetID() {
//     const videoRef = useRef(null);
//     const router = useRouter();
//     const meet_id = router.query.meet_id;
//     const { state, send } = useMeetingMachine();
//     const [projectId, setProjectId] = useState("");
//     const [roomId, setRoomId] = useState(meet_id);

//     // Event Listner
//     useEventListener("lobby:cam-on", () => {
//         if (state.context.camStream && videoRef.current)
//             videoRef.current.srcObject = state.context.camStream;
//     });

//     const { initialize } = useHuddle01();
//     const { joinLobby } = useLobby();
//     const {
//         fetchAudioStream,
//         produceAudio,
//         stopAudioStream,
//         stopProducingAudio,
//         stream: micStream,
//     } = useAudio();
//     const {
//         fetchVideoStream,
//         produceVideo,
//         stopVideoStream,
//         stopProducingVideo,
//         stream: camStream,
//     } = useVideo();
//     const { joinRoom, leaveRoom } = useRoom();

//     const { peers } = usePeers();

//     useEffect(() => {
//         console.log(peers)
//     }, [])



//     return (
//         <div className="grid grid-cols-2 ">
//             <div>
//                 <h1 className="text-6xl font-bold">
//                     Welcome to{" "}
//                     <a className="text-blue-600" href="https://huddle01.com">
//                         Huddle01 SDK!
//                     </a>
//                 </h1>

//                 <h2 className="text-2xl">Room State</h2>
//                 <h3>{JSON.stringify(state.value)}</h3>

//                 <h2 className="text-2xl">Me Id</h2>
//                 <div className="break-words">
//                     {JSON.stringify(state.context.peerId)}
//                 </div>
//                 <h2 className="text-2xl">Consumers</h2>
//                 <div className="break-words">
//                     {JSON.stringify(state.context.consumers)}
//                 </div>

//                 <h2 className="text-2xl">Error</h2>
//                 <div className="break-words text-red-500">
//                     {JSON.stringify(state.context.error)}
//                 </div>
//                 <h2 className="text-2xl">Peers</h2>
//                 <div className="break-words">{JSON.stringify(peers)}</div>
//                 <h2 className="text-2xl">Consumers</h2>
//                 <div className="break-words">
//                     {JSON.stringify(state.context.consumers)}
//                 </div>

//                 <h2 className="text-3xl text-blue-500 font-extrabold">Idle</h2>
//                 <input
//                     type="text"
//                     placeholder="Your Project Id"
//                     value={projectId}
//                     onChange={(e) => setProjectId(e.target.value)}
//                     className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
//                 />
//                 <button
//                     disabled={!state.matches("Idle")}
//                     onClick={() => {
//                         initialize("KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR");
//                     }}
//                 >
//                     INIT
//                 </button>

//                 <br />
//                 <br />
//                 <h2 className="text-3xl text-red-500 font-extrabold">Initialized</h2>
//                 <input
//                     type="text"
//                     placeholder="Your Room Id"
//                     value={roomId}
//                     onChange={(e) => setRoomId(e.target.value)}
//                     className="border-2 text-black border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
//                 />
//                 <button
//                     disabled={!joinLobby.isCallable}
//                     onClick={() => {
//                         joinLobby(roomId);
//                     }}
//                 >
//                     JOIN_LOBBY
//                 </button>
//                 <br />
//                 <br />
//                 <h2 className="text-3xl text-yellow-500 font-extrabold">Lobby</h2>
//                 <div className="flex gap-4 flex-wrap">
//                     <button
//                         disabled={!fetchVideoStream.isCallable}
//                         onClick={fetchVideoStream}
//                     >
//                         FETCH_VIDEO_STREAM
//                     </button>

//                     <button
//                         disabled={!fetchAudioStream.isCallable}
//                         onClick={fetchAudioStream}
//                     >
//                         FETCH_AUDIO_STREAM
//                     </button>

//                     <button disabled={!joinRoom.isCallable} onClick={joinRoom}>
//                         JOIN_ROOM
//                     </button>

//                     <button
//                         disabled={!state.matches("Initialized.JoinedLobby")}
//                         onClick={() => send("LEAVE_LOBBY")}
//                     >
//                         LEAVE_LOBBY
//                     </button>

//                     <button
//                         disabled={!stopVideo//                         onClick={stopVideoStream}
//                     >
//                         STOP_VIDEO_STREAM
//                     </button>
//                     <button
//                         disabled={!stopAudioStream.isCallable}
//                         onClick={stopAudioStream}
//                     >
//                         STOP_AUDIO_STREAM
//                     </button>
//                 </div>
//                 <br />
//                 <h2 className="text-3xl text-green-600 font-extrabold">Room</h2>
//                 <div className="flex gap-4 flex-wrap">
//                     <button
//                         disabled={!produceAudio.isCallable}
//                         onClick={() => produceAudio(micStream)}
//                     >
//                         PRODUCE_MIC
//                     </button>

//                     <button
//                         disabled={!produceVideo.isCallable}
//                         onClick={() => produceVideo(camStream)}
//                     >
//                         PRODUCE_CAM
//                     </button>

//                     <button
//                         disabled={!stopProducingAudio.isCallable}
//                         onClick={() => stopProducingAudio()}
//                     >
//                         STOP_PRODUCING_MIC
//                     </button>

//                     <button
//                         disabled={!stopProducingVideo.isCallable}
//                         onClick={() => stopProducingVideo()}
//                     >
//                         STOP_PRODUCING_CAM
//                     </button>

//                     <button disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
//                         LEAVE_ROOM
//                     </button>
//                 </div>

//                 {/* Uncomment to see the Xstate Inspector */}
//                 {/* <Inspect /> */}
//             </div>
//             <div>
//                 Me Video:
//                 <video ref={videoRef} autoPlay muted></video>
//                 <div className="grid grid-cols-4">
//                     {Object.values(peers)
//                         .filter((peer) => peer.cam)
//                         .map((peer) => (
//                             <Video
//                                 key={peer.peerId}
//                                 peerId={peer.peerId}
//                                 track={peer.cam}
//                                 debug
//                             />
//                         ))}
//                     {Object.values(peers)
//                         .filter((peer) => peer.mic)
//                         .map((peer) => (
//                             <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
//                         ))}
//                 </div>
//             </div>
//         </div >
//     );
// };

