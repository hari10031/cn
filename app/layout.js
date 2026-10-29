import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'AIML Lab Portal - 4 Core Questions & Solutions',
    description: 'Implementation of Perceptron, ANN Sequential, and CNN models with expected outputs and plot diagrams',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
