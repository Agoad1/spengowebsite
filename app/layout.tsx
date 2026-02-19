import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Spengo Website',
    description: 'High-converting website development for ambitious brands.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    );
}
