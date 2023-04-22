import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRecording } from '@huddle01/react/dist/declarations/src/hooks';
import {useRecorder} from '@huddle01/react/app-utils'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      Home
      <ConnectButton />
    </div>
  )
}
