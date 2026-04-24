import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'react-hot-toast';
import ClientLayout from './ClientLayout'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vibrafiup',
  description: 'Vibrafiup-FrontEnd',
  generator: 'Vibrafiup-FrontEnd',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="root font-sans antialiased">
        <ClientLayout>{children}</ClientLayout>
        <Toaster position="top-right" reverseOrder={false} />
        <Analytics />
      </body>
    </html>
  )
}
