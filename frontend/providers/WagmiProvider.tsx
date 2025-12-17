"use client"

import { createConfig, http, WagmiProvider as WagmiProviderBase } from 'wagmi'
import { hardhat, arbitrum, arbitrumSepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected } from 'wagmi/connectors'

const config = createConfig({
  chains: [hardhat, arbitrum, arbitrumSepolia],
  connectors: [injected()],
  transports: {
    [hardhat.id]: http('http://127.0.0.1:8545'),
    [arbitrum.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
})

const queryClient = new QueryClient()

export default function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProviderBase config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProviderBase>
  )
}
