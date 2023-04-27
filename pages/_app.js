import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import { Navbar } from '@/components';
import { useHuddle01 } from "@huddle01/react";
import { useEffect } from 'react';
import { useRouter } from 'next/router';



import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { filecoinHyperspace } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [filecoinHyperspace],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const{initialize} = useHuddle01()
  useEffect(() => {
    initialize("KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR");
    console.log(router.pathname)
  }, []);

  
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        {router.pathname == `/meet/[meet_id]` ? (
          <span></span>
        ) : (
          <Navbar />
        )}
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}