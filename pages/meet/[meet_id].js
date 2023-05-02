import { useRouter } from 'next/router'
import Image from 'next/image'
import profile from '../../public/meetcamera.jpg'
import { MdCallEnd } from 'react-icons/md'
import { BiVideo, BiVideoOff, BiMicrophone, BiMicrophoneOff } from 'react-icons/bi'
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { BsRecordBtn } from 'react-icons/bs'
import { AiOutlineClose, AiOutlineArrowLeft } from 'react-icons/ai'
import {
    useAudio,
    useLobby,
    useMeetingMachine,
    usePeers,
    useRoom,
    useVideo,
    useRecording
} from "@huddle01/react/hooks";
import {useRecorder} from '@huddle01/react/app-utils'
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
    const [isSideOpen, setIsSideOpen] = useState(false) 
    const {startRecording, stopRecording, data: recordingData,error} = useRecording();



    const [audioenabled, setaudioEnabled] = useState(false);
    const [videoenabled, setvideoEnabled] = useState(false);
    const [joinedroom, setJoinedRoom] = useState(false);

    // Event Listner
    useEventListener("lobby:cam-on", () => {
        if (state.context.camStream && videoRef.current)
            videoRef.current.srcObject = state.context.camStream;
    });

    useEventListener("lobby:joined", () => {
        console.log("lobby:joined")
    })

    useRecorder(meet_id,'KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR'|| "");



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
        joinLobby(meet_id)
    }, [])

    function videoToggle() {
        if (videoenabled) {
            stopVideoStream();
        } else {
            fetchVideoStream()
        }
    }

    function audioToggle() {
        if (audioenabled) {
            stopAudioStream();
        } else {
            fetchAudioStream()
        }
    }

    useEffect(() => {
        console.log(peers)
    }, [peers])

    return <>
        <div className='bg-[#212121]  scrollbar-hide h-screen'>
            <div className='px-10 fixed py-2 flex justify-between w-screen'>
                <h1 className='pt-2 bg-gray-900 bg-opacity-70 bg-transparent font-semibold'>{("0" + today.getHours()).slice(-2) + ":" + today.getMinutes()} | {meet_id}</h1>

                {/* VIDEO CAMERA  */}

            </div>

            <div className='grid grid-cols-3 p-6'>
                <div className="col-span-2">
                    <video className='justify-start items-center rounded-xl w-50 mt-6' ref={videoRef} autoPlay muted></video>
                </div>
                <div className="overflow-y-auto scrollbar-hide">
                    {Object.values(peers)
                        .filter((peer) => peer.cam)
                        .map((peer) => (
                            <Video
                                key={peer.peerId}
                                peerId={peer.peerId}
                                track={peer.cam}
                                debug
                                className='w-2/3 rounded-md'
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
            <div className=' sticky flex justify-center space-x-3 cursor-pointer'>
                <Link href="/meet"><div className='bg-red-600 hover:bg-red-700 p-2 rounded-3xl px-3'>
                    <MdCallEnd onClick={() => {
                        leaveRoom();
                    }} className='text-2xl ' />
                </div></Link>

                {/* VIDEO CAMERA  */}
                <div className="">
                    {isActive ? <div className='p-2 rounded-3xl bg-gray-600'><BiVideo className='text-2xl' onClick={() => {
                        setIsActive(!isActive)
                        stopProducingVideo();
                    }} /></div> :
                        <div className='p-2 rounded-3xl bg-red-600 hover:bg-red-700'><BiVideoOff className='text-2xl' onClick={() => {
                            setIsActive(!isActive)
                            produceVideo(camStream);
                        }} /></div>
                    }
                </div>

                <div className="cursor-pointer">
                    {isActive2 ? <div className='p-2 rounded-3xl bg-gray-600' ><BiMicrophone className='text-2xl ' onClick={() => {
                        setIsActive2(!isActive2)
                        stopProducingAudio()
                    }} /></div> :
                        <div className='p-2 rounded-3xl bg-red-600 hover:bg-red-700' ><BiMicrophoneOff className='text-2xl' onClick={() => {
                            setIsActive2(!isActive2)
                            stopProducingAudio(micStream);
                        }} /></div>
                    }
                </div>
                <div className="text-green-300">{(recordingData)?.s3Url}</div>
                <p>{error}</p>
            </div>

            {/* Sidebar opening button */}
            <div onClick={() => setIsSideOpen(!isSideOpen)} className='absolute right-0 top-1/2 cursor-pointer bg-slate-500 p-2 py-6 rounded-l-full' ><AiOutlineArrowLeft className='text-2xl' /></div>

            <ul className={isSideOpen ? "bg-gray-900 h-full w-80   flex-col pt-10 px-5 z-50 absolute top-0 right-0 space-y-5" : "hidden"}>

                {/* RIGHT ARROW BUTTON */}
                <li>
                    <button className='absolute right-6 top-4' onClick={() => setIsSideOpen(!isSideOpen)} ><AiOutlineClose className='text-2xl' /></button>
                </li>

                {/* JOIN ROOM */}
                < li className='ml-2' >
                    <div className="">
                        {!joinedroom ? <button className='p-2 px-4 border-2 rounded-full font-bold flex justify-center items-center' onClick={() => {
                            setJoinedRoom(!joinedroom);
                            joinRoom();
                        }} >Join Room</button>
                            :
                            <button className='p-2 px-4 border-2 border-green-700 rounded-full font-bold flex justify-center items-center text-green-500' onClick={() => {
                                setJoinedRoom(!joinedroom)
                                leaveRoom();
                            }} >Joined . . .</button>
                        }
                    </div>
                </li >

                {/* FETCH AUDIO  */}
                <li className='ml-2'>
                    <div className="flex">
                        <label className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={audioenabled}
                                readOnly
                            />

                            <div
                                onClick={() => {
                                    setaudioEnabled(!audioenabled)
                                    audioToggle();
                                }}
                                className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                            ></div>

                            <span className="ml-2 text-md font-medium ">
                                Fetch Audio
                            </span>
                        </label>
                    </div>
                </li>

                {/* FETCH VIDEO */}
                <li className='ml-2'>
                    <div className="flex">
                        <label className="inline-flex relative items-center mr-5 cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={videoenabled}
                                readOnly
                            />
                            <div
                                onClick={() => {
                                    setvideoEnabled(!videoenabled);
                                    videoToggle();
                                }}
                                className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                            ></div>
                            <span className="ml-2 text-md font-medium ">
                                Fetch Video
                            </span>
                        </label>
                    </div>
                </li >

                {/* RECORDING */}
                < li className='ml-2' >
                    <div className="">
                        {!isActive3 ? <button className='p-2 px-4 border rounded-full font-bold flex justify-center items-center' onClick={() => {
                            setIsActive3(!isActive3)
                            startRecording(`https://${window.location.host}/meet/${meet_id}`)
                        }} ><BsRecordBtn className='mr-2' size='20' />Record</button>
                            :
                            <button className='p-2 px-4 border border-[#E62020] rounded-full font-bold flex justify-center items-center text-[#FF0000]' onClick={() => {
                                setIsActive3(!isActive3)
                                stopRecording();
                            }} ><BsRecordBtn className='mr-2' size='20' /> Recording</button>
                        }
                    </div>
                </li >

                {/* PEERS */}
                < li className='ml-2' >
                    <div className='flex flex-col justify-start items-start ml-3 font-semibold'>
                        <h1 className='text-xl font-semibold underline underline-offset-4'>PEERS</h1>
                        <ul className='mt-3 list-disc'>
                            {Object.values(peers)
                                .map((peer) => {
                                    return(
                                        <li>{peer.peerId}</li>
                                    )
                                })}
                        </ul>
                    </div>
                </li >

            </ul >

        </div >
    </>
}

