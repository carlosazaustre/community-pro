import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ToastProvider } from '@/shared/components/ui/toast';
import { Toaster } from '@/shared/components/ui/toaster';
import SessionProvider from '@/shared/components/SessionProvider';
import NavBar from '@/shared/components/NavBar';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Community Pro',
  description:
    'El objetivo de esta comunidad es ayudarte en tu camino como desarrollador web y elevar tus habilidades en programación.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <ToastProvider>
            <NavBar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
            <Toaster />
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
