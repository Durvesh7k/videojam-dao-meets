import Image from 'next/image'
import doameets from '../public/doameets.png'
import { Navbar } from '@/components'
import Link from 'next/link'
import { MdOutlineKeyboard } from 'react-icons/md'

export default function Meet() {
    return <>
        <Navbar />
        <div className="bg-[#212121] pb-64 pt-64 absolute top-0 flex flex-col-reverse w-full md:flex-row justify-center items-center  space-x-20">
            <div className='pr-20  border-r-2'>
                <div className='pb-7 pt-5 flex flex-col justify-center items-center sm:items-start'>
                    <h1 className='font-bold text-xl'>Join Existing Meet</h1>
                    <form action="" className="flex sm:space-x-5 mt-5 flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0">
                        <div className='flex relative items-center'>
                            <MdOutlineKeyboard className='text-gray-800 absolute mx-2 pointer-events-none' size='25' /><input type="text" placeholder="Enter the Link" className="p-1 text-lg px-5 w-72 md:w-80 text-black outline-none rounded-lg pl-10 focus:out"  ></input>
                        </div>
                        <button className="bg-blue-700 px-8 text-lg rounded-lg font-bold w-32 py-[0.4rem] hover:bg-blue-800">Join</button>
                    </form>
                </div>
                {/* <h1 className='font-bold text-xl'>Create New Meet</h1> */}
                <form className="flex sm:space-x-5 mt-2 flex-col sm:flex-row  space-y-3 sm:space-y-0">
                    {/* <input type="text" placeholder="Enter the Link" className="p-1 text-lg px-5 w-72 md:w-80 text-black outline-none rounded-3xl" /> */}
                    <Link href="hvhjec-verkvr-rvlkr"><button className="bg-blue-700 px-8 text-lg rounded-lg font-bold  py-[0.4rem]">Create New Meet</button></Link>
                </form>
            </div>

            {/* <Image src={doameets} className='md:w-1/2'></Image> */}
            <Link className='w-1/3' href="jhbvr-bjvkr-bjvkbr">
                <div className=' bg-gray-600 p-5 px-6 rounded-lg hover:scale-105 duration-300 '>
                    <h1 className='font-bold text-2xl underline underline-offset-4 tracking-wide'>Scheduled Meetings</h1>
                    <h1 className='text-xl mt-4 font-semibold'>Meet-Title</h1>
                    <p>hvbewucvhjvdwnv vh hwbvih vhw  vn vdhi vhiewvk hv eihwv iwhv ehi vweih sdvrhv sdihs dv</p>
                    <span className='font-bold text-lg '>Meet Link : </span><span className='text-xl text-blue-300 underline ml-2 cursor-text select-all'>jhbvr-bjvkr-bjvkbr</span>
                </div>
            </Link>
        </div>
    </>

}