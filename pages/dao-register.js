import { Navbar } from "@/components";

export default function Register() {
    return (
        <>
            <Navbar />
            <div className="bg-[#212121] h-screen flex justify-center items-start">
                <form action="" className="pt-40 justify-center items-center space-y-6  ">
                    <div className="flex space-x-9 ">
                        <div>
                            <h1 className="text-lg">DAO Name</h1>
                            <input color="blue" placeholder="Enter DAO Name" className="w-[20rem] p-2 rounded-xl bg-slate-700 outline-none px-4" />
                        </div>
                        <div>
                            <div>
                                <h1 className="text-lg">DAO Owner</h1>
                                <input color="blue" placeholder="Enter DAO Name" className="text-md w-[20rem] p-2 rounded-xl bg-slate-700 outline-none px-4" />
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-9 ">
                        <div>
                            <h1 className="text-lg">Date & Time</h1>
                            <input type="datetime-local" color="blue" placeholder="Enter DAO Name" className="w-[20rem] p-2 rounded-xl bg-slate-700 outline-none px-4" />
                        </div>
                        <div>
                            <div>
                                <h1 className="text-lg">DAO Owner</h1>
                                <input color="blue" placeholder="Enter DAO Name" className="text-md w-[20rem] p-2 rounded-xl bg-slate-700 outline-none px-4" />
                            </div>
                        </div>
                    </div>


                </form>
            </div>
        </>
    )

}