import { Divider } from './components/Divider'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import './globals.css'

export const metadata = {
  title: 'FoodMaster',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className='mx-[100px]'>
          <Divider />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  )
}
