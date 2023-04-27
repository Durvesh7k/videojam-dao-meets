import { Navbar} from '@/components'
import Link from 'next/link'
import { MdOutlineKeyboard } from 'react-icons/md'
import axios from "axios";
import {
    useAudio,
    useLobby,
    useMeetingMachine,
    usePeers,
    useRoom,
    useVideo,
} from "@huddle01/react/hooks";
import { useEffect, useState } from 'react'
import Web3Modal from 'web3modal';
// import contractABI from "../artifacts/contracts/Daomeet.sol/Daomeet.json"
import { ethers } from 'ethers'
import { useAccount } from 'wagmi'
import { contractAddress } from '@/config'

export default function Meet() {

    const [roomId, setRoomId] = useState("eup-fkpq-tok");
    const { address } = useAccount();
    const { joinLobby } = useLobby();
    const {fetchVideoStream} = useVideo();




    async function newRoomId() {
        try {
            const response = await axios.post(
                'https://iriko.testing.huddle01.com/api/v1/create-room',
                {
                    title: 'Huddle01-Test',
                    hostWallets: ['0xf96a192C5769684b8d4a77f480585fE09cefeAa6'],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': "VwTZ4AGTxme9snANex9tep3NwvVMGfYd",
                    },
                }
            )

            const newRoomId = response.data.data.roomId;
            console.log(newRoomId);
            return newRoomId;
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        newRoomId();
    }, [])

    async function getRoomId() {
        try {
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                contractABI.abi,
                signer
            )
            const dao = await contract.getDao(address);
            setRoomId(dao.roomId)
        } catch (e) {
            console.log(e);
        }
    }

    async function newMeeting() {
        const newRoomId = await getRoomId();
        try {
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress,
                contractABI.abi,
                signer
            )
            const newMeetTx = await contract.newMeet(newRoomId, 1145);
            newMeetTx.wait();

        } catch (e) {
            console.log(e);
        }

    }



    return <>

        <div className="bg-[#212121] pb-64 pt-24 lg:pt-64 absolute top-0 flex flex-col w-full lg:flex-row justify-center items-center lg:space-x-10 space-y-5 lg:space-y-0 px-5 lg:px-20 ">
            <div className=' lg:border-r-2 flex flex-col justify-center items-center lg:items-start pr-5'>
                <div className='pb-7 pt-5 flex flex-col justify-center items-center lg:items-start lg:justify-start'>
                    <h1 className='font-bold text-xl'>Join Existing Meet</h1>
                    {/* JOIN EXSITING MEET */}
                    <form action="" className="flex sm:space-x-5 mt-2 flex-col sm:flex-row space-y-3 sm:space-y-0 justify-center items-center">
                        <div className='flex relative items-center'>
                            <MdOutlineKeyboard className='text-gray-800 absolute mx-2 pointer-events-none' size='25' /><input type="text" placeholder="Enter the Link" className="p-1 text-lg px-5 w-72 md:w-80 text-black outline-none rounded-lg pl-10"  ></input>
                        </div>
                        <button className="bg-blue-700 px-8 text-lg rounded-lg font-bold w-32 py-[0.4rem] hover:bg-blue-800">Join</button>
                    </form>
                </div>

                {/* CREATE MEET */}
                <h1 className='font-bold text-xl'>Create new Meet</h1>
                <form className="flex sm:space-x-5 mt-2 flex-col sm:flex-row space-y-3 sm:space-y-0 justify-center items-center">
                    <div className='flex relative items-center justify-center'>
                        <input type="text" placeholder="Enter the Description" className="p-1 text-lg px-5 w-72 md:w-80 text-black outline-none rounded-lg" />
                    </div>
                    <Link href="hvhjec-verkvr-rvlkr"><button className="bg-blue-700 px-3 text-lg rounded-lg font-bold  py-[0.4rem] hover:bg-blue-800">Create New Meet</button></Link>
                </form>
            </div>

            {/* <Image src={doameets} className='md:w-1/2'></Image> */}
            <Link className='w-1/3' href={{
                pathname: `/meet/${roomId}`,
            }}
            onClick={()=>{
                joinLobby(roomId)
                fetchVideoStream();
            }}>
                <div className=' bg-gray-600 p-5 px-6 rounded-lg hover:scale-105 duration-300 '>
                    <h1 className='font-bold text-2xl underline underline-offset-4 tracking-wide'>Scheduled Meetings</h1>
                    <h1 className='text-xl mt-4 font-semibold'>Meet-Title</h1>
                    <p>hvbewucvhjvdwnv vh hwbvih vhw  vn vdhi vhiewvk hv eihwv iwhv ehi vweih sdvrhv sdihs dv</p>
                    <span className='font-bold text-lg '>Meet Link : </span><span className='text-xl text-blue-300 underline ml-2 cursor-text select-all'>{roomId}</span>
                </div>
            </Link>
        </div>

    </>

}