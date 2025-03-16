import type { Metadata } from 'next';
// Remove the font import temporarily to fix the error
// import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Battery Dashboard',
  description: 'Monitor your device battery status and history',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning={true}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
