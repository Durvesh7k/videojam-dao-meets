import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {

    const [isNavOpen, setIsNavOpen] = useState(false)

    return <>
        <div className=" relative md:fixed z-50 md:w-11/12 md:mx-16 mx-3 top-7 bg-[#282828] border border-white p-3 px-7  rounded-full flex justify-between items-center" >
            <h1 className='font-bold text-xl cursor-pointer'>Daomeets</h1>
            {/* NAV MENU */}
            <ul className={isNavOpen ? "absolute bg-black h-screen w-[100%] top-[15px] left-0 flex flex-col items-center mt-10 space-y-10 underline underline-offset-4 text-lg" : "text-lg hidden lg:flex lg:space-x-6"}>
                <Link href="/" className='hover:bg-orange-600 p-2 rounded-3xl px-4 duration-300 cursor-pointer'>Home</Link>
                <Link href="/meet" className='hover:bg-orange-600 p-2 rounded-3xl px-4 duration-300 cursor-pointer'>Meet</Link>
                <Link href="/dao-register" className='hover:bg-orange-600 p-2 rounded-3xl px-4 duration-300 cursor-pointer'>Register</Link>
                <Link href="/records" className='hover:bg-orange-600 p-2 rounded-3xl px-4 duration-300 cursor-pointer'>Recordings</Link>
                <div className={isNavOpen ?'md:flex no-underline':'hidden'}>
                    <ConnectButton />
                </div>

            </ul>
            <div className='hidden lg:flex'>
                <ConnectButton />
            </div>

            <div className='lg:hidden cursor-pointer' onClick={() => setIsNavOpen((prev) => !prev)}>
                <div className='h-1 w-6 bg-white '></div>
                <div className='h-1 w-6 bg-white mt-1'></div>
                <div className='h-1 w-6 bg-white mt-1'></div>
            </div>

        </div>

        <style>{`
      .showMenuNav {
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 78px;
        right: 0;
        background: black;
        text-align: center;

      }
    `}</style>
    </>
}