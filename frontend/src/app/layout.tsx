import { Divider } from './components/Divider';
import { UserProvider } from '@/context/UserContext';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'FoodMaster',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <CartProvider>
            <Header />
            <div className='mx-[100px]'>
              <Divider />
            </div>
            {children}
            <Footer />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
