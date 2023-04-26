import { Navbar } from "@/components";
import Image from "next/image";
import img1 from "../public/meet.jpg"
import { FaDownload } from "react-icons/fa"

export default function Records() {
    return (
        <>
            <div className="bg-[#212121] pb-80">
                <Navbar />
                <div className=" flex flex-col items-center pt-12 md:pt-32 ">
                    <h1 className="text-2xl font-bold pb-8 tracking-wide uppercase underline-offset-4 underline">Recordings</h1>
                    <div className=" grid md:grid-cols-2 gap-10 lg:mx-32 mx-10">


                        {/* CARD */}
                        <div className="bg-gray-700 py-5 px-4 flex flex-col lg:flex-row space-x-4 rounded-lg hover:scale-105 duration-500 shadow-md shadow-black items-center">
                            <Image src={img1} className='h-40 w-40'></Image>
                            <div className="flex flex-col justify-center">
                                <h1 className="text-xl font-bold">Title</h1>
                                <p className="text-justify pr-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem voluptate eaque sequi odit sed, quam quo ad quis ex quaerat dolorem soluta, ipsam magnam sint similique omnis ab sunt ullam.</p>
                                <button className="flex gap-2 justify-center items-center p-1 px-3 bg-gray-400 w-32 mt-2 text-gray-900 hover:text-white hover:bg-blue-600 duration-300"><FaDownload />Download</button>
                            </div>
                        </div>
                        <div className="bg-gray-700 py-5 px-4 flex flex-col lg:flex-row space-x-4 rounded-lg hover:scale-105 duration-500 shadow-md shadow-black items-center">
                            <Image src={img1} className='h-40 w-40'></Image>
                            <div className="flex flex-col justify-center">
                                <h1 className="text-xl font-bold">Title</h1>
                                <p className="text-justify pr-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem voluptate eaque sequi odit sed, quam quo ad quis ex quaerat dolorem soluta, ipsam magnam sint similique omnis ab sunt ullam.</p>
                                <button className="flex gap-2 justify-center items-center p-1 px-3 bg-gray-400 w-32 mt-2 text-gray-900 hover:text-white hover:bg-blue-600 duration-300"><FaDownload />Download</button>
                            </div>
                        </div>










                    </div>

                </div>
            </div>
        </>
    )
}