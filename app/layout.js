import { Outfit, Unbounded } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const unbounded = Unbounded({ 
  subsets: ['latin'],
  variable: '--font-unbounded',
  display: 'swap',
})

export const metadata = {
  title: 'Salman Lakhani - Web Developer Portfolio',
  description: 'Professional portfolio of Salman Lakhani, a skilled Web Developer specializing in modern web technologies and creating stunning digital experiences.',
  keywords: 'web developer, portfolio, Salman Lakhani, frontend developer, full stack developer',
  authors: [{ name: 'Salman Lakhani' }],
  openGraph: {
    title: 'Salman Lakhani - Web Developer Portfolio',
    description: 'Professional portfolio showcasing web development projects and experience',
    type: 'website',
  },
}

import MouseTrailer from '@/components/MouseTrailer'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${unbounded.variable}`}>
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <MouseTrailer />
        {children}
      </body>
    </html>
  )
}
