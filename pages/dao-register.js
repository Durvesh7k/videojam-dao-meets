import { Navbar } from "@/components";
import { useState } from "react";
import Web3Modal from 'web3modal';
import contractABI from "../artifacts/contracts/Daomeet.sol/Daomeet.json"
import { ethers } from 'ethers'
import { useAccount } from 'wagmi'
import { contractAddress } from '@/config'

export default function Register() {

    const [data, setData] = useState([{ member: '' }]);
    const [dao, setDao] = useState({
        name : "",
        description: "",
        time: 0,
        members : [],
    })

    const handleClick = (e) => {
        e.preventDefault()
        setData([...data, { member: "" }])
    }

    const handleChange = (e, i) => {
        e.preventDefault()
        const { name, value } = e.target
        const onChangeVal = [...data]
        onChangeVal[i][name] = value
        setData(onChangeVal)
    }

    const handleDelete = (i, e) => {
        e.preventDefault()
        const deleteVal = [...data]
        deleteVal.splice(i, 1)
        setData(deleteVal)
    }

    async function newDao(){

    }

    const handleForm = (event) => {
        setDao({...dao, [event.target.name] : event.target.value})
    }

    function getMembers(){
        let members = [];
        for(var i =0; i<data.length; i++){
            members.push(data[i].member);
        }
        return members;
    }

    function getDao(e){
        e.preventDefault()
        setDao({members: getMembers()});
        setDao({...dao})
        console.log(dao)
    }



    return (
        <>
            <div className="bg-[#212121] absolute w-full top-0 flex justify-center lg:items-start pb-32 items-center">
                {/* FORM  */}
                <form action="" className="pt-24  lg:pt-36 justify-center items-center space-y-2 lg:space-y-6">
                    <div className="flex justify-center pb-5">
                        
                    <h1 className="font-bold text-2xl lg:text-3xl underline underline-offset-4">Register DAO</h1>
                    </div>

                    <div className="space-y-2 md:space-y-0 md:flex md:space-x-9   ">
                        <div>
                            <h1 className="text-lg">DAO Name</h1>
                            <input onChange={handleForm} name="name" placeholder="Enter DAO Name" className="w-[20rem] p-2 rounded-xl bg-slate-700 outline-none px-4" />
                        </div>
                        <div>
                            <div>
                                <h1 className="text-lg">DAO Owner</h1>
                                <input name="owner" placeholder="Enter DAO owner name" className="text-md w-[20rem] p-2 rounded-xl bg-slate-700 outline-none px-4" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 md:space-y-0 md:flex md:space-x-9 ">
                        <div>
                            <h1 className="text-lg">Date & Time</h1>
                            <input onChange={handleForm} name="time" type="datetime-local" placeholder="Enter DAO Name" className="w-[20rem] p-2 rounded-xl bg-slate-700 outline-none px-4" />
                        </div>
                        <div>
                            <div>
                                <h1 className="text-lg">DAO Description</h1>
                                <textarea onChange={handleForm} name="description" placeholder="Enter the description" className="text-md w-[20rem] p-2 rounded-xl bg-slate-700 outline-none px-4" />
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <h1 className="text-lg">Image URL</h1>
                        <input  name="url" type="text" placeholder="Enter Image URL" className=" p-2 rounded-xl bg-slate-700 outline-none px-4 w-full" />
                    </div>


                    {/* ADDING MEMBERS  */}
                    <div>
                    <h1 className="text-lg">Members</h1>
                        {
                            data.map((val, i) => {
                                return (
                                    <div className="mt-3">
                                        <div className="flex space-x-3">
                                            <input type="text" placeholder="Enter member name" className=" p-2 rounded-xl bg-slate-700 outline-none px-4 w-full" name="member" value={val.member} onChange={(e) => handleChange(e, i)} />
                                            <button className="bg-red-700 hover:bg-red-800 px-6 font-bold tracking-wide rounded-lg py-[0.4rem] " onClick={(e) => handleDelete(i, e)} >Delete</button>
                                        </div>

                                    </div>

                                )
                            })
                        }
                        <button onClick={handleClick} className="mt-2 bg-blue-700 px-6 font-bold tracking-wide rounded-lg py-[0.4rem] hover:bg-blue-800">Add</button>
                        <p>
                            {/* {JSON.stringify(data)} */}
                        </p>
                    </div>


                    <div className="justify-center items-center flex">
                        <button onClick={getDao}  type="submit" className="bg-green-600 p-2 px-3 rounded-lg tracking-wide font-bold hover:bg-green-700 ">SUBMIT</button>
                    </div>

                    

                </form >

            </div >
        </>
    )

}