import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Ahsan Aziz - Architect',
  description: 'Professional Architecture Portfolio of Ahsan Aziz',
  keywords: 'architect, architecture, portfolio, design, building',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-dark text-light">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
