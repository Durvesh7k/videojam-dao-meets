import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link'

export default function Navbar() {
    return <div className=" relative md:fixed z-50 md:w-11/12 md:mx-16 mx-5  top-7 bg-[#282828] border border-white p-3 px-7  rounded-full flex justify-between items-center" >
        <h1 className='font-bold text-xl cursor-pointer'>Daomeets</h1>
        <ul className='space-x-6 hidden md:flex text-lg'>
            <Link href="/" className='hover:bg-orange-600 p-2 rounded-3xl px-4 duration-300 cursor-pointer'>Home</Link>
            <Link href="/meet" className='hover:bg-orange-600 p-2 rounded-3xl px-4 duration-300 cursor-pointer'>Meet</Link>
            <Link href="/dao-register" className='hover:bg-orange-600 p-2 rounded-3xl px-4 duration-300 cursor-pointer'>Register</Link>
            <Link href="/" className='hover:bg-orange-600 p-2 rounded-3xl px-4 duration-300 cursor-pointer'>Recordings</Link>
        </ul>
        <div className='hidden md:flex'>
            <ConnectButton />
        </div>

    </div>
}