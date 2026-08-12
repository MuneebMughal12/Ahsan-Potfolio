import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  metadataBase: new URL('https://ahsan-potfolio.vercel.app'),
  title: { default: 'Ahsan Aziz — Architecture', template: '%s — Ahsan Aziz' },
  description: 'Selected architectural works by Ahsan Aziz — residential, commercial and interior design projects.',
  keywords: ['Ahsan Aziz', 'architect', 'architecture portfolio', 'Pakistan architecture'],
  openGraph: {
    title: 'Ahsan Aziz — Architecture',
    description: 'Selected architectural works shaped by context, clarity and human experience.',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahsan Aziz — Architecture',
    description: 'Selected architectural works shaped by context, clarity and human experience.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
