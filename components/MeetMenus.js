
import Link from 'next/link'


export default function MeetMenus() {
    return <>

        <ul className={isNavOpen ? "absolute bg-black h-screen w-[100%] top-[15px] left-0 flex flex-col items-center mt-10 space-y-10 underline underline-offset-4 text-lg" : "text-lg hidden lg:flex lg:space-x-6"}>
            <Link href="/" className='hover:bg-orange-600 p-2 rounded-3xl px-4 duration-300 cursor-pointer'>Home</Link>
            <Link href="/meet" className='hover:bg-orange-600 p-2 rounded-3xl px-4 duration-300 cursor-pointer'>Meet</Link>
            <Link href="/dao-register" className='hover:bg-orange-600 p-2 rounded-3xl px-4 duration-300 cursor-pointer'>Register</Link>
            <Link href="/records" className='hover:bg-orange-600 p-2 rounded-3xl px-4 duration-300 cursor-pointer'>Recordings</Link>

        </ul>
    </>
}