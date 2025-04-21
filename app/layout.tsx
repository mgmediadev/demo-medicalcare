import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/layout/header/Header';
import ReduxProvider from '@/redux/provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Medical Care',
  description: 'Created by Gonzalo Medina',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ReduxProvider>
        <Header />
        <main className='mt-16 lg:mt-0 ml-0 lg:ml-16 p-4 min-h-[92vh]'>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
