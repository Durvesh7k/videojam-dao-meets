import Image from 'next/image'
import doameets from '../public/doameets.png'
import { Navbar } from '@/components'
import Link from 'next/link'
import { MdOutlineKeyboard } from 'react-icons/md'

export default function Meet() {
    return <>
        <Navbar />


        <div className="bg-[#212121] pb-64 pt-24 lg:pt-64 absolute top-0 flex flex-col w-full lg:flex-row justify-center items-center lg:space-x-10 space-y-5 lg:space-y-0 px-5 lg:px-20 ">

            <div className=' lg:border-r-2 flex flex-col justify-center items-center lg:items-start pr-5'>
                <div className='pb-7 pt-5 flex flex-col justify-center items-center'>
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

            {/* SCHEDULED MEETINGS */}
     
                <Link className='lg:w-1/3' href="jhbvr-bjvkr-bjvkbr">
                <h1 className='font-bold text-2xl underline underline-offset-4 tracking-wide mb-5'>Scheduled Meetings</h1>
                    <div className=' bg-gray-700 p-5 px-6 rounded-lg  hover:scale-105 duration-300 '>
                        <h1 className='text-xl font-semibold'>Meet-Title</h1>
                        <p className='text-clip'>hvbewucvhjvdwnv vh hwbvih vhw  vn vdhi vhiewvk hv eihwv iwhv ehi vweih sdvrhv sdihs dv jjlbr k vjre vk v rek vre vreh vre v erk</p>
                        <span className='font-bold text-lg '>Meet Link : </span><span className='text-xl text-blue-300 underline ml-2 cursor-text select-all'>jhbvr-bjvkr-bjvkbr</span>
                    </div>
                </Link>
           


        </div>

    </>

}