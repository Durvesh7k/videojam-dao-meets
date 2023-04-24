import Image from 'next/image'
import home_img from '../public/home.jpg'
import { Navbar } from '@/components'
import Link from 'next/link'


export default function Home() {
  return (
    <>
      <Navbar />
      <div className=" bg-[#212121] pb-16 top-0 absolute flex flex-col-reverse md:grid md:grid-cols-2 pt-32 justify-between  items-center  ">
        <div className='grid-cols-1 flex flex-col justify-center mx-8 sm:mx-28 '>
          <h1 className='leading-tight text-4xl lg:text-6xl font-bold'>Meet Without Worrying about Language</h1>
          <p className=' mt-8 text-lg text-justify '>Use Moment to get new experience in doing video meet, don't care about language, you can set it in the Settings secion</p>

          <div className='mt-8 space-x-10 flex  items-center '>
            <Link href='/meet'><button className='p-[0.6rem] px-7 rounded-3xl border border-white bg-[#fe7639] hover:bg-transparent text-lg'>Go to Meet</button></Link>
            <Link href='/dao-register'><button className='text-lg hover:underline underline-offset-4 duration-500'>Register for DAO</button></Link>
          </div>
        </div>

        <div className='grid-cols-1 flex justify-center items-center' ><Image src={home_img} className='h-[80%] w-[80%]' >
        </Image></div>
      </div>



    </>
  )
}
