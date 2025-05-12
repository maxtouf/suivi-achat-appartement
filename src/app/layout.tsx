import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Suivi Achat Appartement',
  description: 'Application de suivi d\'achat d\'appartement neuf',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 overflow-auto p-4 md:p-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}