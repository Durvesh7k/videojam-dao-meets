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
        joinRoom();
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

                {/* MICROPHONE  */}
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
                <button onClick={produceVideo}>produceVideo</button>
                <button onClick={produceAudio}>produceAudio</button>
            </div>
        </div>
    </>
}