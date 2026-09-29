import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LearningProvider } from '@/context/LearningContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SKILLFORGE — Learn. Practice. Build.',
  description: 'Learn modern technology through practical courses, guided projects, and hands-on challenges.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 flex flex-col min-h-screen selection:bg-violet-600 selection:text-white`}>
        <LearningProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LearningProvider>
      </body>
    </html>
  );
}
