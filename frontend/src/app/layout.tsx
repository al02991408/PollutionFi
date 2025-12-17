import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import WagmiProvider from '../../../providers/WagmiProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PollutionFi - Environmental Monitoring',
  description: 'Real-time air quality monitoring with blockchain incentives',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider>
          {children}
        </WagmiProvider>
      </body>
    </html>
  )
}